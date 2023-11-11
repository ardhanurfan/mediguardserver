var express = require("express");
var router = express.Router();
const user = require("../controller/UserController");

/* GET users listing. */
router.get("/user/get-all", user.getUsers);

/* POST register user */
router.post("/user/sign-up", user.signup);

/* POST login user */
router.post("/user/sign-in", user.signin);

module.exports = router;
