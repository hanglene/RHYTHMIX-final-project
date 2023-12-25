// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { CreateError } = require('../utils/error');
const User = require('../models/user');
const userToken = require('../models/userToken');
const { CreateSuccess } = require('../utils/success');

const signup = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.fullName;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const record = await User.findOne({ email: email });

    if (record) {
      return res.status(400).send({
        message: "Email is already registered.",
      });
    } else {
      const user = new User({
        fullName: fullName,
        email: email,
        password: hashed,
      });

      const result = await user.save();

      const { _id } = await result.toJSON();
      const token = jwt.sign({ _id: _id }, process.env.jwt_key);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.send({ message: "Sign up successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.jwt_key);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    if (user.admin) {
      res.send({
        message: "Admin login success",
        isAdmin: true,
      });
    } else {
      res.send({
        message: "User login success",
        isAdmin: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};


const getUser = async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    if (!cookie) {
      return res.status(401).send({
        message: 'Unauthenticated',
      });
    }
    const claims = jwt.verify(cookie, process.env.jwt_key);
    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }
    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Unauthenticated",
    });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "Success",
  });
};

const sendEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
    if (!user) {
      return next(CreateError(404, "User not found to reset the email!"));
    }

    const payload = {
      email: user.email,
    };
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.jwt_key, { expiresIn: expiryTime });

    const newToken = new userToken({
      userId: user._id,
      token: token,
    });
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "trinhdh21406c@st.uel.edu.vn", // Update with your Gmail email
        pass: "yowjuvthtycpnjaa", // Update with your Gmail password
      },
    });
    let mailDetails = {
      from: '"RHYTHMIX" <trinhdh21406c@st.uel.edu.vn>', // Update with your Gmail email
      to: email,
      subject: "Password Reset Request",
      html: `
        <html>
        <head>
        <title>Password Reset Request</title>
        </head>
        <body>
        <p>Dear ${user.fullName},</p>
        <p>We have received a request to reset your password for your account with Rhythmix. To complete the password reset process, please click on the button below:</p>
        <a href='${process.env.LIVE_URL}/reset/${token}'><button style="background-color: #D02007; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Reset Password</button></a>
        <p>Please note that this link is only valid for 5 minutes. If you did not request a password reset, please disregard this message.</p>
        <p>Thank you,</p>
        <p>Rhythmix Team</p>
        </body>
        </html>
      `,
    };
    mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.error(err);
        return next(CreateError(500, "Something went wrong while sending the email"));
      } else {
        await newToken.save();
        return next(CreateSuccess(200, "Email sent successfully!"));
      }
    });
  } catch (error) {
    console.error(error);
    next(CreateError(500, "Internal Server Error"));
  }

};

const resetpw = async (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.jwt_key, async (err, data) => {
    if (err) {
      return next(CreateError(500, "Reset link is expired!"));
    } else {
      const response = data;
      const user = await User.findOne({ email: { $regex: '^' + response.email + '$', $options: 'i' } });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;

      try {
        const updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );

        return next(CreateSuccess(200, "Password reset success!"));
      } catch (error) {
        return next(CreateError(500, "Something went wrong while resetting the password!"));
      }
    }
  });
};

module.exports = {
  signup,
  login,
  getUser,
  logout,
  sendEmail,
  resetpw
};
