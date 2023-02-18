const { User } = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const userControllers = {
  register: async (req, res) => {
    try {
      const name = await User.findOne({ username: req.body.username });
      if (name) {
        res.json({ message: "Account exits!", code: false });
      } else {
        let code = Math.floor(Math.random() * (9999 - 1000) + 1000);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
          ...req.body,
          password: hashed,
          code,
        });
        const user = await newUser.save();
        const { email } = user;
        res.json({
          message: `Please check mail to verify your account ${email}`,
          code: true,
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "levantu.iuh@gmail.com",
            pass: "Hoilamgi03",
          },
        });

        const mailOptions = {
          from: "levantu.iuh@gmail.com",
          to: req.body.email,
          subject: "Send from instagram",
          text: `Click me ! Verify account ! ${code}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("error", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    } catch (error) {
      res.json({ message: "Can not create account" });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.json({ message: "Account exits!" });
      } else {
        let { code } = user;
        if ((code = req.body.code)) {
          const newUser = await User.updateOne(
            { username: req.body.username },
            { isVerify: true },
            { new: true }
          );
          if (newUser.acknowledged) {
            const user = await User.findOne({ username: req.body.username });
            return res.json({ user });
          }
        }
      }
    } catch (error) {
      res.json({ message: "Can not verify account" });
    }
  },
  login: async (req, res) => {
    try {
      let user;
      user = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.email }],
      });
      // user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.json({ message: "Account not exist !", isVerify: true });
      } else {
        const validPass = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPass) {
          return res.json("Password fail");
        }
        if (validPass && user) {
          const access_Token = jwt.sign(
            {
              username: user.username,
            },
            process.env.SECRET_KEY
          );
          res.json({ user, access_Token: access_Token });
        }
      }
    } catch (error) {
      res.status(500).json("Can not login account");
    }
  },
  users: async (req, res) => {
    try {
      let user = await User.find();
      res.json(user);
    } catch (error) {
      res.status(500).json("not account");
    }
  },
};

module.exports = userControllers;
