const moment = require("moment");
const getRandomPin = require("../../lib/generateCode");
const { Book } = require("../../lib/sequelize");
const Service = require("../service");

class BookService extends Service {
  static createBook = async (req) => {
    try {
      const { title, description, quantity, author } = req.body;

      const isBookAlreadyCreate = await Book.findOne({
        where: {
          title: title,
        },
      });

      if (isBookAlreadyCreate) {
        return this.handleError({
          message: "Book already registered",
          statusCode: 400,
        });
      }

      const dateFormat = moment().format("YYYYMMDD");
      const number = getRandomPin();

      const product_code = `BK-${number}-${dateFormat}`;

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "cover_url";
      const { filename } = req.file;

      const newBook = await Book.create({
        cover_url: `${uploadFileDomain}/${filePath}/${filename}`,
        title,
        description,
        quantity,
        author,
        code_product: product_code,
      });

      return this.handleSuccess({
        message: "Book Created",
        statusCode: 201,
        data: newBook,
      });
    } catch (err) {
      console.log(err);
      this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static getAllBook = async (req) => {
    try {
      const findBooks = await Book.findAll();

      if (!findBooks) {
        return this.handleError({
          message: "Book not found",
          statusCode: 404,
        });
      }

      return this.handleSuccess({
        message: "Success get books",
        statusCode: 200,
        data: findBooks,
      });
    } catch (err) {
      console.log(err);
      this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static deleteBookById = async (req) => {
    try {
      const { id } = req.params;
      await Book.destroy({
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

  static editBook = async (req) => {
    try {
      const { description, quantity } = req.body;
      const { id } = req.params;

      const findBook = await Book.findByPk(id);

      if (!findBook) {
        return this.handleError({
          message: "Book not found",
          statusCode: 404,
        });
      }

      await Book.update(
        {
          description,
          quantity,
        },
        {
          where: { id },
        }
      );

      return this.handleSuccess({
        message: "Book Edited",
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
}

module.exports = BookService;
