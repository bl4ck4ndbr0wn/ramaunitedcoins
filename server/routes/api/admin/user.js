const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load User model
const User = require("../../../models/User");

// Check if user is Admins
const authorize = require("../../../utils/authorize");

// Load Input Validation
const validateRegisterInput = require("../../../validation/register");
const validateUdateUserInput = require("../../../validation/adminRegister");

//Send Email
const SendEmail = require("../../../utils/sendMail");

// @route   GET api/v1/admin/user/test
// @desc    Tests tokem route
// @access  Publin
router.get("/test", (req, res) => res.json({ msg: "Admin User Works" }));

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

// @route   GET api/v1/admin/user/:user_id
// @desc    Get all Users
// @access  Privatte
router.get(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    const errors = {};

    User.findById(req.params.user_id)
      .then(user => {
        if (!user) {
          errors.noprofile = "There is no user";
          return res.status(404).json(errors);
        }

        res.json({
          name: user.name,
          email: user.email,
          role: user.role
        });
      })
      .catch(err => res.status(404).json({ profile: "There are no user" }));
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
                //send email
                SendEmail(mailOptions, res, user);
              })
              .catch(err => res.status(500).send({ msg: err }));
          });
        });
      }
    });
  }
);

// @route   POST api/v1/admin/user/update
// @desc    Update user details.
// @access  Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    const { errors, isValid } = validateUdateUserInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });

    const userFields = {};

    if (req.body.name) userFields.name = req.body.name;
    if (req.body.email) userFields.email = req.body.email;
    if (req.body.role) userFields.role = req.body.role;
    userFields.avatar = avatar;

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        // Update
        User.findOneAndUpdate(
          { email: req.body.email },
          { $set: userFields },
          { new: true }
        ).then(user => res.json(user));
      } else {
        errors.email = "User does not exist";
        res.statusCode(404).json(errors);
      }
    });
  }
);

module.exports = router;
