const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");
const fetch = require("node-fetch");

// Request model
const Request = require("../../../models/Request");
// Profile model
const Profile = require("../../../models/Profile");
// Load User Model
const User = require("../../../models/User");
//lad CommissionSetting Model
const CommissionSetting = require("../../../models/CommissionSetting");
//load commission model
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
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${
        req.body.modetransfer
      }&tsyms=USD`
    )
      .then(response => response.json())
      .then(responseData => {
        let key = Object.keys(responseData)[0];

        return {
          price: responseData[key]
        };
      })
      .catch(err => console.log(err))
      .then(fin => {
        Round.findOne({ isActive: true })
          .then(round => {
            let rcc = req.body.amount * fin.price * round.price;
            let ruc = rcc * (round.bonus / 100);

            // get fields
            const tokenFields = {
              user: req.body.user,
              modetransfer: req.body.modetransfer,
              amount: req.body.amount,
              ruc,
              rcc,
              round_bonus: round.bonus,
              round_price: round.price
            };

            const newToken = new Request(tokenFields);

            newToken.save().then(token => res.json(token));
          })
          .catch();
      });
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

                CommissionSetting.findOne({ isActive: true }).then(
                  commission => {
                    if (commission.type === "RUC") {
                      let ruc = (token.ruc * commission.percentage) / 100;

                      let commissionFields = {
                        user: token.user,
                        percentage: commission.percentage,
                        ruc
                      };

                      saveCommission(commissionFields, token);
                    } else if (commission.type === "RCC") {
                      let rcc = (token.rcc * commission.percentage) / 100;

                      let commissionFields = {
                        user: token.user,
                        percentage: commission.percentage,
                        rcc
                      };

                      saveCommission(commissionFields, token, res);
                    }
                  }
                );
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

const saveCommission = (commissionFields, token, res) => {
  const newCommission = new Commission(commissionFields);
  newCommission
    .save()
    .then(commission => {
      token.save().then(tokens => res.json(tokens));
    })
    .catch(err =>
      res.status(404).json({ commissionnotsaved: "Commission not saved." })
    );
};

module.exports = router;
