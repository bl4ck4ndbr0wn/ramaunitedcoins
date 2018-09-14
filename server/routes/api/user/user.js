const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const passport = require("passport");
const crypto = require("crypto");
const Hogan = require("hogan.js");
const fs = require("fs");

// Load Input Validation
const validateRegisterInput = require("../../../validation/register");
const validateLoginInput = require("../../../validation/login");
const validateTokenInput = require("../../../validation/tokenValidate");
const validateResendInput = require("../../../validation/ResendConfirmation");

// Load User model
const User = require("../../../models/User");
// Load Token model
const Token = require("../../../models/Token");

//Send Email
const SendEmail = require("../../../utils/sendMail");

// get email template
const confirmTemplate = fs.readFileSync(
  "./server/view/confirmEmail.hjs",
  "utf-8"
);

//Compille Email Template
const compileConfirmEmailTempalte = Hogan.compile(confirmTemplate);

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/v1/user/register
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
        "The email address is already associated with another account.";
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
              const token = new Token({
                user: user._id,
                token: crypto.randomBytes(16).toString("hex")
              });
              // Save the verification token
              token
                .save()
                .then(() => {
                  // Send the email
                  const url = `http://${req.headers.host}/confirm/${
                    token.token
                  }`;
                  const mailOptions = {
                    from: "noreply@ramaunitedcoin.io",
                    to: user.email,
                    subject: "Welcome to Rama United Coin! Confirm your email",
                    html: compileConfirmEmailTempalte.render({
                      title: "Rama United Coin",
                      user: user.name,
                      url
                    })
                  };

                  SendEmail(mailOptions, res);
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

// @route   GET api/v1/user/login
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

// @route   GET api/v1/user/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/v1/user/confirmation
// @desc    Confirm User
// @access  Public
router.post("/confirmation", (req, res) => {
  const { errors, isValid } = validateTokenInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Finding a matching token
  Token.findOne({ token: req.body.token })
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

// @route   POST api/v1/user/resend
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
    const token = new Token({
      user: user._id,
      token: crypto.randomBytes(16).toString("hex")
    });
    // Save the verification token
    token
      .save()
      .then(() => {
        // Send the email
        const url = `http://${req.headers.host}/confirm/${token.token}`;
        const mailOptions = {
          from: "no-reply@ramaunitedcoin.io",
          to: user.email,
          subject: "Welcome to Rama United Coin! Confirm your email",
          html: compileConfirmEmailTempalte.render({
            title: "Rama United Coin",
            user: user.name,
            url
          })
        };

        SendEmail(mailOptions, res);
      })
      .catch(err => {
        return res.status(500).send({ msg: err.message });
      });
  });
});

module.exports = router;
