const AWS = require('aws-sdk');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { registerEmailParams } = require('../helpers/email');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2',
});
//fix region later to pull from env

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // console.log('REGISTER CONTROLLER', req.body);

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken',
      });
    }
    //generate token with user name, email, and password
    const token = jwt.sign(
      {
        name,
        email,
        password,
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '10m',
      }
    );

    //send email
    const params = registerEmailParams(email, token);
    console.log(params);
    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        console.log('email submitted to SES', data, email);
        res.json({
          message: `Email has been sent to ${email}, Follow the directions to complete your registration.`,
        });
      })
      .catch((error) => {
        console.log('ses email on reg error', error);

        res.json({
          message: `something happened... whoops.... ${error}`,
          error: `We could not verify your email, please try again later.`,
        });
      });
  });
};
