const { DataTypes } = require("sequelize");

const Book = (sequelize) => {
  return sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cover_url: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Book;
