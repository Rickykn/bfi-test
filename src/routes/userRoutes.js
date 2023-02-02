const { userController } = require("../controllers");
const fileUploader = require("../lib/uploader");
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch(
  "/edit-profile",
  authorizedLoggedInUser,
  fileUploader({
    destinationFolder: "profile-picture",
    fileType: "image",
    prefix: "POST",
  }).single("profile_image_file"),
  userController.editUser
);

router.delete("/:id", userController.deleteUser);
router.get("/", authorizedLoggedInUser, userController.getUserById);

module.exports = router;
