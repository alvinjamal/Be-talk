const { response } = require("../middlewares/common");
const {
  create,
  findEmail,
  verification,
  changePassword,
} = require("../models/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken, decodeToken } = require("../Helpers/auth");
const cloudinary = require("../config/photo");
const ModelUsers = require("../Models/users");
const email = require("../middlewares/email");

const Port = process.env.PORT;
const Host = process.env.HOST;

const UsersController = {
  registerUsers: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (users) {
      return response(res, 404, false, "email already use", " register fail");
    }

    // create otp
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id_user: uuidv4(),
      name_user: req.body.name_user,
      email: req.body.email,
      password,
      otp,
    };
    try {
      const result = await create(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let text = `Hello ${req.body.name_user} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email: req.body.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, " register fail");
    }
  },

  refresh: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return resp(res, 404, false, "Email not found");
    }
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return resp(res, 404, false, "Wrong refresh token ");
    }
    const payload = {
      email: users.email,
    };
    users.newToken = generateToken(payload);
    resp(res, 200, true, users, "Success get new token ");
  },

  login: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    if (users.verif == 0) {
      return response(res, 404, false, null, " email not verified");
    }
    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 404, false, null, "wrong password");
    }
    delete users.password;
    delete users.otp;
    delete users.verif;
    let payload = {
      id_user: users.id_user,
      email: users.email,
    };
    users.token = generateToken(payload);
    response(res, 200, true, users, "login success");
  },

  verificationOtp: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }

    if (users.otp == otp) {
      const result = await verification(req.body.email);
      return response(res, 200, true, result, " verification email success");
    }
    return response(
      res,
      404,
      false,
      null,
      " wrong otp please check your email"
    );
  },

  forgotPassword: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    let payload = {
      email: req.body.email,
    };
    const token = generateToken(payload);

    let text = `Hello ${users.name_user} \n please click link below to reset password http://localhost:4000/users/Reset-Pass/ ${token}`;
    const subject = `Reset Password`;
    let sendEmail = email(req.body.email, subject, text);
    if (sendEmail == "email not sent!") {
      return response(res, 404, false, null, "email fail");
    }
    return response(res, 200, true, null, "send email success");
  },

  resetPassword: async (req, res) => {
    const token = req.params.token;
    const decoded = decodeToken(token);
    const {
      rows: [users],
    } = await findEmail(decoded.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }

    let password = bcrypt.hashSync(req.body.password);
    const result = await changePassword(decoded.email, password);
    return response(res, 200, true, result, " change password success");
  },

  getUser: async (req, res) => {
    ModelUsers.getAll()
      .then((result) => {
        response(res, 200, true, result.rows, "Get User Success");
      })
      .catch((err) => {
        response(res, 404, false, err, "Get User Fail");
      });
  },

  getDetail: async (req, res) => {
    const id_user = req.payload.id_user;
    ModelUsers.getDataById(id_user)
      .then((result) =>
        response(res, 200, true, result.rows, "Get Detail User Success")
      )
      .catch((err) => response(res, 404, false, err, "Get Detail User Fail"));
  },

  update: async (req, res) => {
    try {
      const id_user = req.payload.id_user;
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "chat",
      });
      req.body.photo = image.url;
      const data = {
        id_user,
        username: req.body.username,
        bio: req.body.bio,
        phone: req.body.phone,
        photo: image.url,
      };
      await ModelUsers.updateProfile(data);
      return response(res, 200, true, req.body, "Update Profile Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Update Profile Fail");
    }
  },
};

exports.UsersController = UsersController;
