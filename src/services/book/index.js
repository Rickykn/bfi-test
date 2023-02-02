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

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "cover_url";
      const { filename } = req.file;

      const newBook = await Book.create({
        cover_url: `${uploadFileDomain}/${filePath}/${filename}`,
        title,
        description,
        quantity,
        author,
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
}

module.exports = BookService;
