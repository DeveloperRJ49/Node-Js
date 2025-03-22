const userModel = require("../models/UserModel");
var nodemailer = require("nodemailer");

const verifyEmail = (req, res) => {
  return res.render("forgetPassword/verifyEmail");
};

const email = async (req, res) => {
  try {
    let email = req.body.usersemail;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.redirect("/");
    }

    const otp = Math.floor(Math.random() * 100000);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Sending Email using Node.js",
      html: `Share Your OTP ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        let obj = {
          email: email,
          otp: otp,
        };
        res.cookie("otp", obj);
        return res.redirect("/forget/otp");
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
const otpPage = (req, res) => {
  return res.render("forgetPassword/otpPage");
};

const otpPost = (req, res) => {
  let otp = req.body.otp;
  let userotp = req.cookies.otp.otp;
  if (otp == userotp) {
    return res.redirect("/forget/newPassPage");
  } else {
    return false;
  }
};

const newPassPage = (req, res) => {
  if (!req.cookies['otp']) {

    return res.redirect("/")
  }
  return res.render("forgetPassword/newPassPage")
}

const newPassword = async (req, res) => {
  let { newpass, conpass } = req.body;
  if (newpass == conpass) {
    const usereamil = req.cookies.otp.email
    await userModel.findOneAndUpdate({ email: usereamil }, {
      password: newpass
    })

    return res.redirect('/')
  } else {
    console.log("confirm password and new password not match");
    return res.redirect('/forget/newPassPage')
  }
}

module.exports = {
  verifyEmail,
  email,
  otpPage,
  otpPost,
  newPassPage,
  newPassword,
};
