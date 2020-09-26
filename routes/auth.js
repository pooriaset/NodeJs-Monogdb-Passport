const express = require("express");
const router = express.Router();


let authController = require("../controllers/AuthController");
let authValidator = require("../validators/AuthValidator");

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    return next();
});

router.get("/login", authValidator.login(), authController.loginForm);
router.get("/register", authValidator.register(), authController.registerForm);

router.post("/login", authController.login);
router.post("/register", authController.register);


module.exports = router;