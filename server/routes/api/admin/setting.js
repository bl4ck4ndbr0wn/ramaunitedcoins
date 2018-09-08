const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

// Round model
const Round = require("../../../models/Round");
// Account model
const Account = require("../../../models/Account");

// Load Validation
const validateRoundInput = require("../../../validation/round");
const validateAccountInput = require("../../../validation/account");

// Check if user is Admins
const authorize = require("../../../utils/authorize");

// @route   GET api/v1/admin/setting/test
// @desc    Tests setting route
// @access  Publin
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json({ msg: "Token Works" })
);

// @route   GET /api/v1/admin/setting
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

        account.map(acc => {
          let type = acc.type;
          let dict = [];

          axios
            .get(`https://api.coinmarketcap.com/v2/ticker/1/?convert=ETH`)
            .then(response => {
              // loop over values
              let quotes = response.data.quotes;
              if (quotes !== undefined) {
                let coinPrice = quotes["ETH"].price;
                let usdPrice = quote[USD].price;
                let price = usdPrice / coinPrice;
                dict["ETH"] = price;
              }

              //   let coinPrice = quotes[type].price;
              //   let usdPrice = quotes.USD.price;

              //   let price = usdPrice / coinPrice;
              //   dict["ETH"] = price;
            })
            .catch(err => {
              console.log(err);
            });

          console.log(dict);
        });

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

// @route   POST /api/v1/admin/setting/account
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

// @route   POST api/v1/admin/setting/distribution
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

    //check if there is another active round
    Round.findOne({ isActive: true }).then(round => {
      if (round) {
        round.isActive = false;

        round.save().then(
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
          })
        );
      } else {
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
    });
  }
);

module.exports = router;
