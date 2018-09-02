const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const user = require("./server/routes/api/user/user");
const profile = require("./server/routes/api/user/profile");
const request = require("./server/routes/api/user/request");

const setting = require("./server/routes/api/admin/setting");
const AdminUser = require("./server/routes/api/admin/user");
const AdminRequest = require("./server/routes/api/admin/request");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// DB Config
const db = require("./server/config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./server/config/passport")(passport);

// File uploads
app.use("/uploads", express.static("uploads"));

// Routes (User)
app.use("/api/v1/user", user);
app.use("/api/v1/profile", profile);
app.use("/api/v1/request", request);

// Routes (Agent)

// Routes (Admin)
app.use("/api/v1/admin/setting", setting);
app.use("/api/v1/admin/user", AdminUser);
app.use("/api/v1/admin/request", AdminRequest);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
