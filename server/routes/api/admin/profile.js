const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const randomize = require("randomatic");

const _ = require("lodash");

// Request model
const Request = require("../../../models/Request");
// Profile model
const Profile = require("../../../models/Profile");
// Load User Model
const User = require("../../../models/User");

// Validation
const validateProfileInput = require("../../../validation/profile");

// Check if user is Admins
const authorize = require("../../../utils/authorize");

// @route   GET api/v1/admin/profile/test
// @desc    Tests tokem route
// @access  Publin
router.get("/test", (req, res) => res.json({ msg: "Admin Profile Works" }));

// @route   POST api/v1/admin/profile/:id
// @desc    create user profile.
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    let refferralCode = randomize("Aa0", 16);
    // Get fields
    const profileFields = {};
    profileFields.user = req.params.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.telephone) profileFields.telephone = req.body.telephone;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.modetransfer)
      profileFields.modetransfer = req.body.modetransfer;
    if (req.body.amount) profileFields.amount = req.body.amount;
    if (req.body.referedcode) profileFields.referedcode = req.body.referedcode;

    Profile.findOne({ user: req.params.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.params.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create new Code.
        profileFields.referralcode = refferralCode;
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
