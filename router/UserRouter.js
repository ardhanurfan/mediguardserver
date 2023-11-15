var express = require("express");
var router = express.Router();
const user = require("../controller/UserController");

/* GET users listing. */
router.get("/get-all", user.getUsers);

/* POST register user */
router.post("/sign-up", user.signup);

/* POST login user */
router.post("/sign-in", user.signin);

module.exports = router;
