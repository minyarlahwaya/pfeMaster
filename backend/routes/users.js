var express = require('express');
var router = express.Router();
const userController = require("../controllers/UserControllers");
const registerValidation = require("../middleware/inscription");
const requireAuth = require("../middleware/requireAuth")



router.post("/register",registerValidation,userController.signup);
router.post("/login",userController.login_post );
router.post("/logout",userController.logout );
router.get("/getprofile",requireAuth,userController.getProfile );
router.put("/updateprofile",requireAuth,userController.updateProfile);




module.exports = router;

