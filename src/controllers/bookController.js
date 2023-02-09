const BookService = require("../services/book");
const logger = require("../lib/logger");

const bookController = {
  createNewBook: async (req, res) => {
    try {
      const serviceResult = await BookService.createBook(req);

      if (!serviceResult.success) throw serviceResult;

      logger.logger.log("info", "successfully create new book");

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

  getAllBook: async (req, res) => {
    try {
      const serviceResult = await BookService.getAllBook(req);

      if (!serviceResult.success) throw serviceResult;

      logger.logger.log("info", "success get all book");

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

  deleteBook: async (req, res) => {
    try {
      const serviceResult = await BookService.deleteBookById(req);

      if (!serviceResult.success) throw serviceResult;

      logger.logger.log("info", "success delete one book");

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

  editBook: async (req, res) => {
    try {
      const serviceResult = await BookService.editBook(req);

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
};

module.exports = bookController;
