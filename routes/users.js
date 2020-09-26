const express = require("express");
const router = express.Router();
let userController = require("../controllers/UserController");
let userValidator = require("../validators/UserValidator");

router.get("/", userController.GetAllUsers);

router.post("/add", userValidator.handle(), userController.CreateUser);

router.get("/:id", userController.GetUserById);

router.put("/:id", userController.UpdateUser);

router.delete("/:id", userController.DeleteUser);


module.exports = router;