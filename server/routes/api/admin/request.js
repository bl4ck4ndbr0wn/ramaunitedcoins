const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");
const fetch = require("node-fetch");
const Hogan = require("hogan.js");
const fs = require("fs");

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

//Send Email
const SendEmail = require("../../../utils/sendMail");

// get email templates
const newRequestTemplate = fs.readFileSync(
  "./server/view/newRequestEmail.hjs",
  "utf-8"
);

const requestStatusTemplate = fs.readFileSync(
  "./server/view/requestStatusEmail.hjs",
  "utf-8"
);

//Compille Email Template
const compileNewRequestTemplate = Hogan.compile(newRequestTemplate);
const compileRequestStatusTempalte = Hogan.compile(requestStatusTemplate);

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

    if (req.body.modetransfer === "Bank") {
      let rcc = req.body.amount * req.body.price;
      let ruc = rcc * (req.body.bonus / 100);

      // get fields
      const tokenFields = {};

      tokenFields.user = req.body.user;
      if (req.body.modetransfer)
        tokenFields.modetransfer = req.body.modetransfer;
      if (req.body.amount) tokenFields.amount = req.body.amount;

      tokenFields.rcc = rcc;
      tokenFields.ruc = ruc;

      if (req.body.price) tokenFields.round_price = req.body.price;
      if (req.body.bonus) tokenFields.round_bonus = req.body.bonus;
      if (req.body.confirmed)
        (tokenFields.confirmed = req.body.confirmed),
          (tokenFields.ApprovedBy = req.user.id),
          (tokenFields.ApprovedDate = new Date());

      const newToken = new Request(tokenFields);

      newToken.save().then(token => {
        // sendUserDetails(token, res);
        User.findById(token.user).then(user => {
          const mailOptions = {
            from: "noreply@ramaunitedcoin.io",
            to: user.email,
            subject: "Rama United Coin! #New Request",
            html: compileNewRequestTemplate.render({
              title: "Rama United Coin",
              mode: token.modetransfer,
              amount: `$ ${token.amount}`,
              email: user.email,
              ruc: token.ruc.toFixed(4),
              rcc: token.rcc.toFixed(4),
              transactionId: token._id,
              round_price: token.round_price,
              round_bonus: token.round_bonus,
              Confirmed: token.confirmed ? "Accepted" : "Pending"
            })
          };

          SendEmail(mailOptions, res, token);
        });

        // const mailOptions = {
        //   title: "", // ruc
        //   head: "", // dear sir
        //   info: "", //description
        //   url: "" // request details
        // };
      });
    } else {
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
          let rcc = req.body.amount * fin.price * req.body.price;
          let ruc = rcc * (req.body.bonus / 100);

          // get fields
          const tokenFields = {};

          tokenFields.user = req.body.user;
          if (req.body.modetransfer)
            tokenFields.modetransfer = req.body.modetransfer;
          if (req.body.amount) tokenFields.amount = req.body.amount;

          tokenFields.rcc = rcc;
          tokenFields.ruc = ruc;

          if (req.body.price) tokenFields.round_price = req.body.price;
          if (req.body.bonus) tokenFields.round_bonus = req.body.bonus;
          if (req.body.confirmed)
            (tokenFields.confirmed = req.body.confirmed),
              (tokenFields.ApprovedBy = req.user.id),
              (tokenFields.ApprovedDate = new Date());

          const newToken = new Request(tokenFields);

          newToken.save().then(token => {
            User.findById(token.user).then(user => {
              const mailOptions = {
                from: "noreply@ramaunitedcoin.io",
                to: user.email,
                subject: "Rama United Coin! #New Request",
                html: compileNewRequestTemplate.render({
                  title: "Rama United Coin",
                  mode: token.modetransfer,
                  amount: `${token.amount} ${token.modetransfer}`,
                  email: user.email,
                  ruc: token.ruc.toFixed(4),
                  rcc: token.rcc.toFixed(4),
                  transactionId: token._id,
                  round_price: token.round_price,
                  round_bonus: token.round_bonus,
                  Confirmed: token.confirmed ? "Accepted" : "Pending"
                })
              };

              SendEmail(mailOptions, res, token);
            });
          });
        });
    }
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

const sendUserDetails = () => {};

module.exports = router;
