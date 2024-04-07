const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");
const auth = require("../middleware/auth");


router.get("/:id", UserController.getOne);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.post("/admin/login", UserController.loginAdmin);
// router.put("/:id", auth, UserController.update);
// router.delete("/:id", auth, UserController.delete);

module.exports = router;
