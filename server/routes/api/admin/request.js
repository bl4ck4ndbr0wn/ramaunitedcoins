const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

// Request model
const Request = require("../../../models/Request");
// Profile model
const Profile = require("../../../models/Profile");
// Load User Model
const User = require("../../../models/User");
//lad Commission Model
const Commission = require("../../../models/Commission");

// Validation
const validateAdminTokenRequestInput = require("../../../validation/tokenRequest");

// Check if user is Admins
const authorize = require("../../../utils/authorize");

// @route   GET api/v1/admin/request/test
// @desc    Tests tokem route
// @access  Publin
router.get("/test", (req, res) => res.json({ msg: "Token Works" }));

// @route   GET api/v1/admin/request
// @desc    Get tokens
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    Request.find()
      .sort({ date: -1 })
      .then(token => res.json(token))
      .catch(err =>
        res.status(404).json({ notokensfound: "No Requests found" })
      );
  }
);

// @route   GET api/v1/admin/request/:id
// @desc    Get request by ID
// @access  Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    Request.findById(req.params.id)
      .populate("user", ["name", "avatar", "email", "role"])
      .then(request => {
        if (!request) {
          errors.norequest = "There is no request for this id";
          res.status(404).json(errors);
        }

        res.json(request);
      })
      .catch(err =>
        res.status(404).json({ request: "There is no request for this Id" })
      );
  }
);

// @route   POST api/v1/admin/request
// @desc    Request Token
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    const { errors, isValid } = validateAdminTokenRequestInput(req);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // get fields
    const tokenFields = {
      user: req.body.user,
      modetransfer: req.body.modetransfer,
      amount: req.body.amount,
      confirmed: req.body.confirmed,
      price: req.body.price,
      bonus: req.body.bonus
    };
    const newToken = new Request(tokenFields);

    newToken
      .save()
      .then(token => res.json(token))
      .catch(err =>
        res
          .status(404)
          .json({ tokennotsaved: "Failed to save Token :: " + err })
      );
  }
);

//@route POST api/v1/admin/request/confirm/:id
// @desc    Confirm payment
// @access  Private(admin)
router.post(
  "/confirm/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        if (user.role === "admin") {
          Request.findById(req.params.id)
            .then(token => {
              // Check if already confirmed
              if (token.confirmed) {
                token.confirmed = false;

                token.save().then(tokens => res.json(tokens));
              } else {
                token.confirmed = true;

                Commission.findOne({ isActive: true }).then(commission => {
                  if (commission.type === "RUC") {
                    let ruc;
                    ruc = (token.ruc * commission.percentage) / 100;
                    token.ruc = token.ruc + ruc;

                    token.save().then(tokens => res.json(tokens));
                  } else if (commission.type === "RCC") {
                    let rcc;
                    rcc = (token.rcc * commission.percentage) / 100;
                    token.rcc = token.rcc + rcc;

                    token.save().then(tokens => res.json(tokens));
                  }
                });
              }
            })
            .catch(err =>
              res.status(404).json({ tokennotfound: "No Token found" })
            );
        }
      })
      .catch(err => res.status(404).json({ usernotfound: "No User found" }));
  }
);

module.exports = router;
