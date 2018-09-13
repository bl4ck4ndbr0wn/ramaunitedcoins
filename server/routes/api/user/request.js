const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const fetch = require("node-fetch");

// Request model
const Request = require("../../../models/Request");
// Profile model
const Profile = require("../../../models/Profile");
// Load User Model
const User = require("../../../models/User");

// Load Round Model
const Round = require("../../../models/Round");

// Validation
const validateTokenRequestInput = require("../../../validation/request");
const validateDocumentInput = require("../../../validation/document");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // rejest a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    let errors = {
      fileupload: "Only Jpeg or png are allowed."
    };

    cb(new Error(errors), false);
  }
};

const upload = multer({ storage: storage });

// @route   GET api/v1/reqest/test
// @desc    Tests tokem route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Token Request Works" }));

// @route   GET api/v1/request
// @desc    Get tokens
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(token => res.json(token))
      .catch(err =>
        res.status(404).json({ notokensfound: "No Requests found" })
      );
  }
);

// @route   GET api/token/:id
// @desc    GET token information
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.findById(req.params.id)
      .then(token => {
        // Check for token owner
        if (
          token.user.toString() !== req.user.id ||
          req.user.role !== "admin"
        ) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        Profile.findOne({ user: token.user.toString() }).then(profile => {
          res.json({ token, profile });
        });
      })
      .catch(err => res.status(404).json({ tokennotfound: "No Token found" }));
  }
);

// @route   POST api/v1/request
// @desc    Request Token
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTokenRequestInput(req.body);
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
              user: req.user.id,
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

// @route   POST api/v1/request/document/:id
// @desc    Upload Confirmation Documents
// @access  Private
router.post(
  "/document/:id",
  passport.authenticate("jwt", { session: false }),
  upload.any("fileupload"),
  (req, res) => {
    const { errors, isValid } = validateDocumentInput(req);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Request.findById(req.params.id)
      .then(token => {
        req.files.map(file => {
          const documentFields = {
            originalname: file.originalname,
            filename: file.filename,
            path: file.path
          };
          // Add to document array
          token.document.unshift(documentFields);

          token
            .save()
            .then(token => res.json(token))
            .catch(err =>
              res.status(404).json({ tokennotsaved: "Failed to save Document" })
            );
        });
      })
      .catch(err =>
        res.status(404).json({ tokennotfound: "No Token with that id found" })
      );
  }
);

// @route   DELETE api/v1/request/:id
// @desc    Delete token
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Request.findById(req.params.id)
        .then(token => {
          // Check for token owner
          if (
            token.user.toString() !== req.user.id ||
            req.user.role !== "admin"
          ) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          token.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ tokennotfound: "No Token found" })
        );
    });
  }
);
// @route   DELETE api/v1/request/document/:id/:document_id
// @desc    Remove document from token
// @access  Private
router.delete(
  "/document/:id/:document_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.findById(req.params.id)
      .then(token => {
        // Check to see if document exists
        if (
          token.document.filter(
            document => document._id.toString() === req.params.document_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ documentnotexists: "Document does not exist" });
        }

        // Get remove index
        const removeIndex = token.document
          .map(item => item._id.toString())
          .indexOf(req.params.document_id);

        // Splice document out of array
        token.document.splice(removeIndex, 1);

        token.save().then(token => res.json(token));
      })
      .catch(err =>
        res.status(404).json({ tokennotfound: "No Token request found" })
      );
  }
);

module.exports = router;
