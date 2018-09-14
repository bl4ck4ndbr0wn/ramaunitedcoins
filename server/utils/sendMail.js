const nodemailer = require("nodemailer");
const Hogan = require("hogan.js");
const fs = require("fs");

// User model
const User = require("../models/User");

// Sendgrid Config
const userSg = require("../config/keys").user;
const passSg = require("../config/keys").pass;

// get email templates
const newRequestTemplate = fs.readFileSync(
  "./server/view/newRequestEmail.hjs",
  "utf-8"
);

const requestStatusTemplate = fs.readFileSync(
  "./server/view/requestStatusEmail.hjs",
  "utf-8"
);

//Compille Email Template
const compileNewRequestTemplate = Hogan.compile(newRequestTemplate);
const compileRequestStatusTempalte = Hogan.compile(requestStatusTemplate);

// Send the email
const transporter = nodemailer.createTransport({
  service: "Sendgrid",
  auth: {
    user: userSg,
    pass: passSg
  }
});

module.exports = function sendUserDetails(token, res) {
  User.findById(token.user).then(user => {
    const mailOptions = {
      from: "noreply@ramaunitedcoin.io",
      to: user.email,
      subject: "Rama United Coin! #New Request",
      html: compileNewRequestTemplate.render({
        title: "Rama United Coin",
        mode: token.modetransfer,
        amount:
          token.modetransfer === "Bank"
            ? `$ ${token.amount}`
            : `${token.amount} ${token.modetransfer}`,
        email: user.email,
        ruc: token.ruc.toFixed(4),
        rcc: token.rcc.toFixed(4),
        transactionId: token._id,
        round_price: token.round_price,
        round_bonus: token.round_bonus,
        Confirmed: token.confirmed ? "Accepted" : "Pending"
      })
    };

    SendEmail(mailOptions, res, (details = token));
  });
};

module.exports = function SendEmail(mailOptions, res, details) {
  console.log("sending ......");
  transporter.sendMail(mailOptions, err => {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    if (details) {
      res.json(details);
    }
    res
      .status(200)
      .send("A verification email has been sent to " + mailOptions.to + ".");
  });
};
