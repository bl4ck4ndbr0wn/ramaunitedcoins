module.exports = {
  mongoURI: process.env.MONGODB_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  //SendGrid
  user: process.env.SENDGRID_USERNAME,
  pass: process.env.SENDGRID_PASSWORD
};
