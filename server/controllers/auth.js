const AWS = require('aws-sdk');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
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
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_TO],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<html><h1>Hello ${name}, verify your email address!</h1 style="color:red;"><p>
            Please click the following link to verify your email and finish your registration:
            </p>
            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p></html>`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Complete your registration',
        },
      },
    };

    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        console.log('email submitted to SES', data);
        res.send('Email sent');
      })
      .catch((error) => {
        console.log('ses email on register', error.message);
        res.send('email failed');
      });
  });
};
