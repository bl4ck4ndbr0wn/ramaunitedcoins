const express = require("express");
const router = express.Router();
const passport = require("passport");

// Round model
const Round = require("../../models/Round");
// Account model
const Account = require("../../models/Account");

// Load Validation
const validateRoundInput = require("../../validation/round");
const validateAccountInput = require("../../validation/account");

function authorize(role) {
  return function(req, res, next) {
    if (req.user.role === role) {
      next();
    } else {
      next(new Error("Unauthorized."));
    }
  };
}

// @route   GET api/setting/test
// @desc    Tests setting route
// @access  Publin
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json({ msg: "Token Works" })
);

// @route   GET api/setting
// @desc    Get settings
// @access  Private(admin)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.find()
      .then(account => {
        if (!account) {
          errors.noaccount = "There are no account";
          return res.status(404).json(errors);
        }

        Round.find()
          .then(round => {
            if (!round) {
              errors.noround = "There are no Rounds";
              return res.status(404).json(errors);
            }
            res.json({ account, round });
          })
          .catch(err =>
            res.status(404).json({ noroundsfound: "No Round found" })
          );
      })
      .catch(err =>
        res.status(404).json({ noaccountsfound: "No accounts found" })
      );
  }
);

// @route   POST api/setting/account
// @desc    Create Setting
// @access  Private
router.post(
  "/account",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    const { errors, isValid } = validateAccountInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Get fields
    const accountFields = {};

    accountFields.user = req.user.id;
    if (req.body.type) accountFields.type = req.body.type;
    if (req.body.address) accountFields.address = req.body.address;
    if (req.body.isActive) accountFields.isActive = req.body.isActive;

    // Add to accounts array
    Account.findOne({ type: req.body.type }).then(account => {
      if (account) {
        //update
        Account.findOneAndUpdate(
          { type: req.body.type },
          { $set: accountFields },
          { new: true }
        ).then(account => {
          res.json(account);
        });
      } else {
        console.log(account);
        //Create account
        new Account(accountFields)
          .save()
          .then(account => res.json(account))
          .catch(err =>
            res.statusCode(404).send({ msg: "Unable to Save Account." })
          );
      }
    });
  }
);

// @route   POST api/setting/distribution
// @desc    Create distrubition
// @access  Private
router.post(
  "/distribution",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    const { errors, isValid } = validateRoundInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Get fields
    const roundFields = {};

    roundFields.user = req.user.id;
    if (req.body.round) roundFields.round = req.body.round;
    if (req.body.price) roundFields.price = req.body.price;
    if (req.body.bonus) roundFields.bonus = req.body.bonus;
    if (req.body.isActive) roundFields.isActive = req.body.isActive;

    // Add to accounts array
    Round.findOne({ round: req.body.round }).then(round => {
      if (round) {
        //update
        Round.findOneAndUpdate(
          { round: req.body.round },
          { $set: roundFields },
          { new: true }
        ).then(round => {
          res.json(round);
        });
      } else {
        //Create round
        new Round(roundFields)
          .save()
          .then(round => res.json(round))
          .catch(err =>
            res.statusCode(404).send({ msg: "Unable to Save Round." })
          );
      }
    });
  }
);

module.exports = router;
