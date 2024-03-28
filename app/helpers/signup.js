// const { encrypt, compare } = require('../services/crypto');
const User = require('../models/userModel');
require("dotenv").config();
const nodemailer = require('nodemailer');
const  MAIL_SETTINGS  = {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  };
const transporter = nodemailer.createTransport(MAIL_SETTINGS);
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
// const { sendMail } = require('../services/MAIL');

const createUser = async (email="", password="")=>{
  return new Promise(async (resolve, reject)=>{
    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const otpGenerated = otpGenerator.generate(6);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      otp: otpGenerated,
    });
    if (!newUser) {
      reject([false, 'Unable to sign you up']);
    }
      await sendMail({
        to: email,
        OTP: otpGenerated,
      });
      resolve("verification code sent to the registered mail!");
    } catch (error) {
      reject([false, 'Unable to sign up, Please try again later', error]);
    }
  });
  };
  const sendMail = async (params) => {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to, // list of receivers
        subject: 'Hello ✔', // Subject line
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the club.</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
          <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
        </div>
      `,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  module.exports = createUser;