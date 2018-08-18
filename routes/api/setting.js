const express = require("express");
const router = express.Router();
const passport = require("passport");

// Setting model
const Setting = require("../../models/Setting");

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
  authorize("admin"),
  (req, res) => {
    Setting.find()
      .then(setting => res.json(posts))
      .catch(err =>
        res.status(404).json({ nosettingsfound: "No Settings found" })
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

    res.json(accountFields);
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

    res.json(roundFields);
  }
);

module.exports = router;
