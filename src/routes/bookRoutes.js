const { bookController } = require("../controllers");
const fileUploader = require("../lib/uploader");
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post(
  "/",
  authorizedLoggedInUser,
  fileUploader({
    destinationFolder: "cover",
    fileType: "image",
    prefix: "POST",
  }).single("cover_image_file"),
  bookController.createNewBook
);
router.get("/", authorizedLoggedInUser, bookController.getAllBook);
router.delete("/:id", authorizedLoggedInUser, bookController.deleteBook);
router.patch("/:id", authorizedLoggedInUser, bookController.editBook);

module.exports = router;
