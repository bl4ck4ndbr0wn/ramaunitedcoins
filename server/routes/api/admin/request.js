const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

const _ = require("lodash");

// Request model
const Request = require("../../../models/Request");
// Profile model
const Profile = require("../../../models/Profile");
// Load User Model
const User = require("../../../models/User");

// Validation
const validateAdminTokenRequestInput = require("../../../validation/tokenRequest");

// Check if user is Admins
const authorize = require("../../../utils/authorize");

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

// @route   GET api/v1/admin/request/test
// @desc    Tests tokem route
// @access  Publin
router.get("/test", (req, res) => res.json({ msg: "Token Works" }));

// @route   GET api/v1/admin/request
// @desc    Get tokens
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  (req, res) => {
    Request.find()
      .sort({ date: -1 })
      .then(token => res.json(token))
      .catch(err =>
        res.status(404).json({ notokensfound: "No Requests found" })
      );
  }
);

// @route   POST api/v1/admin/request
// @desc    Request Token
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  upload.array("fileupload"),
  (req, res) => {
    const { errors, isValid } = validateAdminTokenRequestInput(req);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // get fields
    const tokenFields = {
      user: req.body.user,
      modetransfer: req.body.modetransfer,
      amount: req.body.amount,
      confirmed: req.body.confirmed
    };
    const newToken = new Request(tokenFields);

    newToken
      .save()
      .then(token => {
        let fileModels = [];
        console.log(JSON.parse(req.body.fileupload));

        req.body.fileupload.map(file => {
          const documentFields = {
            originalname: file.originalname,
            filename: file.filename,
            path: file.path
          };
          // Add to document array
          token.document.unshift(documentFields);

          token
            .save()
            .catch(err =>
              res
                .status(404)
                .json({ documentnotsaved: "Failed to save Document" })
            );
        });

        res.json(token);
      })
      .catch(err =>
        res
          .status(404)
          .json({ tokennotsaved: "Failed to save Token :: " + err })
      );
  }
);

module.exports = router;
