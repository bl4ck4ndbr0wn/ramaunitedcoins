const Q = require("q");
const nodemailer = require("nodemailer");
const emailTemplates = require("email-templates");
const sendMailTransport = require("nodemailer-smtp-transport");

/*
 *Parts of the sendMail function call:
    ‘no-reply@codemoto.io’ – From email address
    user.email – Who we’re sending the email to. Customize to your needs.
    ‘Welcome!’ – The subject of our email.
    ‘signup’ – The name of the template to be used.
    locals – Variable that includes the variables for our email’s body.


  *add the following code where you would like to trigger an email.
    var locals = { name: "New User", siteName: "Codemoto" };
    mailer.sendMail('no-reply@codemoto.io', user.email, 'Welcome!', 'signup', locals).then(function () {
      res.status(200).send('A welcome email has been sent to ' + user.email + '.');
    }, function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }
    });
*/

module.exports = {
  _template: null,
  _transport: null,

  //Creating Our Init Function
  init: config => {
    const d = Q.defer();

    emailTemplates(config.emailTplsDir, (err, template) => {
      if (err) {
        return d.reject(err);
      }

      this._template = template;
      this._transport = nodemailer.createTransport({
        service: "Sendgrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });

      return d.resolve();
    }).bind(this);

    return d.promise;
  },

  //responsible for sending out emails.
  send: (from, to, subject, text, html) => {
    const d = Q.defer();

    const params = {
      from,
      to,
      subject,
      text
    };
    if (html) {
      params.html = html;
    }

    this._transport.sendMail(params, (err, res) => {
      if (err) {
        console.log(err);
        return d.reject(err);
      } else {
        return d.resolve(res);
      }
    });

    return d.promise;
  },

  //Templated Emails
  sendMail: (from, to, subject, tplName, locals) => {
    const d = Q.defer();
    const self = this;

    this.init({
      emailTplsDir: "email-templates"
    })
      .then(() => {
        this._template(tplName, locals, (err, html, text) => {
          if (err) {
            console.log(err);
            return d.reject();
          }

          self.send(from, to, subject, text, html).then(res => {
            return d.resolve(res);
          });
        });
      })
      .bind(this);

    return d.promise;
  }
};
