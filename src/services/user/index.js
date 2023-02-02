const { generateToken } = require("../../lib/jwt");
const { User } = require("../../lib/sequelize");
const Service = require("../service");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const fs = require("fs");

class UserService extends Service {
  static register = async (req) => {
    try {
      const { name, email, password } = req.body;

      const isUsernameEmailTaken = await User.findOne({
        where: {
          [Op.or]: [{ name }, { email }],
        },
      });

      if (isUsernameEmailTaken) {
        return this.handleError({
          message: "Username and Email has been taken",
          statusCode: 400,
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return this.handleSuccess({
        message: "Registered User",
        statusCode: 201,
        data: newUser,
      });
    } catch (err) {
      console.log(err);
      this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static login = async (req) => {
    try {
      const { credential, password } = req.body;

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ name: credential }, { email: credential }],
        },
      });

      if (!findUser) {
        return this.handleError({
          message: "Wrong username or password",
          statusCode: 400,
        });
      }

      const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

      if (!isPasswordCorrect) {
        return this.handleError({
          message: "wrong username or password",
          statusCode: 400,
        });
      }

      delete findUser.dataValues.password;

      const token = generateToken({
        id: findUser.id,
        name: findUser.dataValues.name,
      });

      return this.handleSuccess({
        message: "Logged in user",
        statusCode: 200,
        data: {
          user: findUser,
          token,
        },
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static editUser = async (req) => {
    try {
      const { name } = req.body;
      const { token } = req;

      if (!req.body) {
        return this.handleError({
          message: "Bad request",
          statusCode: 500,
        });
      }

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "profile_images";
      const filename = req.file?.filename;

      await User.update(
        {
          name,
          profile_picture: req.file
            ? `${uploadFileDomain}/${filePath}/${filename}`
            : undefined,
        },
        {
          where: { id: token.id },
        }
      );

      const newDataUser = await User.findByPk(token.id);

      return this.handleSuccess({
        message: "Edited Post",
        statusCode: 200,
        data: newDataUser,
      });
    } catch (err) {
      console.log(err);
      fs.unlinkSync(
        __dirname + "/../public/profile-picture/" + req.file.filename
      );
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static deleteUserById = async (req) => {
    try {
      const { id } = req.params;
      await User.destroy({
        where: {
          id,
        },
      });
      return this.handleSuccess({
        message: "Deleted Success",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static getUserById = async (req) => {
    try {
      const { token } = req;

      const data = await User.findByPk(token.id);

      if (!data) {
        return this.handleError({
          message: "User Not Found",
          statusCode: 400,
        });
      }

      return this.handleSuccess({
        message: "User Found",
        statusCode: 200,
        data: data,
      });
    } catch (err) {
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };
}

module.exports = UserService;
