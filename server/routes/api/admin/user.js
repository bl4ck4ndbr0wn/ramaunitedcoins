const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require("nodemailer");

// Load User model
const User = require("../../../models/User");

// Check if user is Admins
const authorize = require("../../../utils/authorize");

// Load Input Validation
const validateRegisterInput = require("../../../validation/register");

// Sendgrid Config
const userSg = require("../../../config/keys").user;
const passSg = require("../../../config/keys").pass;

// @route   GET api/v1/admin/user/all
// @desc    Get all Users
// @access  Privatte
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    const errors = {};

    User.find()
      .then(users => {
        if (!users) {
          errors.noprofile = "There are no users";
          return res.status(404).json(errors);
        }

        res.json(users);
      })
      .catch(err => res.status(404).json({ profile: "There are no users" }));
  }
);

// @route   POST api/v1/admin/user/register
// @desc    Register user
// @access  Private
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                // Send the email
                const transporter = nodemailer.createTransport({
                  service: "Sendgrid",
                  auth: {
                    user: userSg,
                    pass: passSg
                  }
                });

                const mailOptions = {
                  from: "noreply@ramaunitedcoin.io",
                  to: user.email,
                  subject: "Welcome to Rama United Coin! Account Created.",
                  text: `Hello ${
                    user.email
                  },\n\n You're now amember of RUC!\n\n Your login details are:\n\n email:${
                    user.email
                  } \n\n
                password: ${req.body.password} \n\n
                Kindly login to view recent transaction. .\n`
                };
                //senf email
                transporter.sendMail(mailOptions, err => {
                  if (err) {
                    return res.status(500).send({ msg: err.message });
                  }

                  res.json(user);
                });
              })
              .catch(err => res.status(500).send({ msg: err }));
          });
        });
      }
    });
  }
);

module.exports = router;
