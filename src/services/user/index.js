const { generateToken } = require("../../lib/jwt");
const { User } = require("../../lib/sequelize");
const Service = require("../service");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

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
}

module.exports = UserService;
