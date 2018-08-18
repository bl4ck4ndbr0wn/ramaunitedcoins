const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateTokenInput = require("../../validation/tokenValidate");
const validateResendInput = require("../../validation/ResendConfirmation");

// Load User model
const User = require("../../models/User");

// Load TokenVerify model
const TokenVerify = require("../../models/TokenVerify");

// Sendgrid Config
const userSg = require("../../config/keys").user;
const passSg = require("../../config/keys").pass;

// Check if user is Admins
function authorize(role) {
  return function(req, res, next) {
    if (req.user.role === role) {
      next();
    } else {
      next(new Error("Unauthorized."));
    }
  };
}

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    // Make sure user doesn't already exist
    if (user) {
      errors.email =
        "The email address you have entered is already associated with another account.";
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
              // Create a verification token for this user
              const token = new TokenVerify({
                user: user._id,
                token: crypto.randomBytes(16).toString("hex")
              });
              // Save the verification token
              token
                .save()
                .then(() => {
                  // Send the email
                  const transporter = nodemailer.createTransport({
                    service: "Sendgrid",
                    auth: {
                      user: userSg,
                      pass: passSg
                    }
                  });
                  const mailOptions = {
                    from: "no-reply@ramaunitedcoin.io",
                    to: user.email,
                    subject: "Welcome to Rama United Coin! Confirm your email",
                    text: `Hello ${
                      user.email
                    },\n\n You're on your way!\n\n Let's confirm your email address.\n\n By clicking on the following link, you are confirming your email address:\n\n \nhttp://${
                      req.headers.host
                    }/confirmation/${token.token} .\n`
                  };
                  transporter.sendMail(mailOptions, err => {
                    if (err) {
                      return res.status(500).send({ msg: err.message });
                    }
                    res
                      .status(200)
                      .send(
                        "A verification email has been sent to " +
                          user.email +
                          "."
                      );
                  });
                })
                .catch(err => {
                  return res.status(500).send({ msg: err.message });
                });
            })
            .catch(err => console.log(err));
        });
      });
    }
    // Make sure user doesn't already exist
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = `The email address ${email} is not associated with any account. Double-check your email address and try again.`;
      return res.status(404).json(errors);
    }

    // // Make sure the user has been verified
    // errors.email = `Your account has not been verified. Check your email to Confirm Account Creation.`;
    // if (!user.isVerified) return res.status(401).json(errors);

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          isVerified: user.isVerified
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Invalid Email or Password.";
        errors.email = "Invalid Email or Password.";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/all
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

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   POST api/users/confirmation
// @desc    Confirm User
// @access  Public
router.post("/confirmation", (req, res) => {
  const { errors, isValid } = validateTokenInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Finding a matching token
  TokenVerify.findOne({ token: req.body.token })
    .then(token => {
      if (!token) {
        errors.token =
          "We were unable to find a valid token. Your token my have expired.";
        return res.status(400).send(errors);
      }

      // If we found a token, find a matching user
      User.findOne({ _id: token.user }).then(user => {
        if (!user)
          return res
            .status(400)
            .send({ msg: "We were unable to find a user for this token." });

        if (user.isVerified)
          return res
            .status(400)
            .json({ msg: "This user has already been verified." });
        // Verify and save the user
        user.isVerified = true;
        user
          .save()
          .then(() => {
            // User Matched
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              role: user.role,
              isVerified: user.isVerified
            };

            res.status(200).json(payload);
          })
          .catch(err => res.status(500).send({ msg: err.message }));
      });
    })
    .catch(err => {
      return res.status(400).json(err);
    });
});

// @route   POST api/users/resend
// @desc    Resend User Confirmation
// @access  Public
router.post("/resend", (req, res) => {
  const { errors, isValid } = validateResendInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "We were unable to find a user with that email.";
      return res.status(400).json(errors);
    }
    if (user.isVerified) {
      errors.email = "This account has already been verified. Please log in.";
      return res.status(400).json(errors);
    }

    // Create a verification token for this user
    const token = new TokenVerify({
      user: user._id,
      token: crypto.randomBytes(16).toString("hex")
    });
    // Save the verification token
    token
      .save()
      .then(() => {
        // Send the email
        const transporter = nodemailer.createTransport({
          service: "Sendgrid",
          auth: {
            user: userSg,
            pass: passSg
          }
        });
        const mailOptions = {
          from: "no-reply@ramaunitedcoin.io",
          to: user.email,
          subject: "Welcome to Rama United Coin! Confirm your email",
          text: `Hello ${
            user.email
          },\n\n You're on your way!\n\n Let's confirm your email address.\n\n By clicking on the following link, you are confirming your email address:\n\n \nhttp://${
            req.headers.host
          }/confirmation/${token.token} .\n`
        };
        transporter.sendMail(mailOptions, err => {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res
            .status(200)
            .send("A verification email has been sent to " + user.email + ".");
        });
      })
      .catch(err => {
        return res.status(500).send({ msg: err.message });
      });
  });
});

module.exports = router;
