const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

// Token model
const Token = require("../../models/Token");
// Profile model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// Validation
const validateTokenInput = require("../../validation/token");
const validateDocumentInput = require("../../validation/document");

function authorize(role) {
  return function(req, res, next) {
    if (req.user.role === role) {
      next();
    } else {
      next(new Error("Unauthorized."));
    }
  };
}

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
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only Jpeg or png are allowed."), false);
  }
};

const upload = multer({ storage: storage });

// @route   GET api/token/test
// @desc    Tests tokem route
// @access  Publin
router.get("/test", (req, res) => res.json({ msg: "Token Works" }));

// @route   GET api/token
// @desc    Get tokens
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Token.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(token => res.json(token))
      .catch(err =>
        res.status(404).json({ notokensfound: "No Requests found" })
      );
  }
);

// @route   POST api/token
// @desc    Request Token
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTokenInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // get fields
    const tokenFields = {
      user: req.user.id,
      modetransfer: req.body.modetransfer,
      amount: req.body.amount
    };
    const newToken = new Token(tokenFields);

    newToken.save().then(token => res.json(token));
  }
);

// @route   DELETE api/token/:id
// @desc    Delete token
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Token.findById(req.params.id)
        .then(token => {
          // Check for token owner
          if (token.user.toString() !== req.user.id) {
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

// @route   POST api/token/:id
// @desc    Request Token
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

    res.json(req.files);

    Token.findById(req.params.id)
      .then(token => {
        req.json(req.files);
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

// @route   DELETE api/token/document/:id/:document_id
// @desc    Remove document from token
// @access  Private
router.delete(
  "/document/:id/:document_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Token.findById(req.params.id)
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
