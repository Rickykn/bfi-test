const UserService = require("../services/user");
const logger = require("../lib/logger");

const userController = {
  register: async (req, res) => {
    try {
      const serviceResult = await UserService.register(req);

      if (!serviceResult.success) throw serviceResult;

      logger.logger.log("info", serviceResult.message);

      return res.status(serviceResult.statusCode || 201).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      logger.logger.log("error", err.message);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const serviceResult = await UserService.login(req);
      if (!serviceResult.success) throw serviceResult;

      logger.logger.log("info", serviceResult.message);

      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      logger.logger.log("error", err.message);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  editUser: async (req, res) => {
    try {
      const serviceResult = await UserService.editUser(req);
      if (!serviceResult.success) throw serviceResult;
      logger.logger.log("info", serviceResult.message);
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      logger.logger.log("error", err.message);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const serviceResult = await UserService.deleteUserById(req);

      if (!serviceResult.success) throw serviceResult;
      logger.logger.log("info", serviceResult.message);
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
      });
    } catch (err) {
      logger.logger.log("error", err.message);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const serviceResult = await UserService.getUserById(req);

      if (!serviceResult.success) throw serviceResult;

      logger.logger.log("info", serviceResult.message);

      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      logger.logger.log("error", err.message);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
