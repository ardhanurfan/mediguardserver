var express = require("express");
var router = express.Router();
const user = require("../controller/UserController");

/* GET users listing. */
router.get("/users", user.getUsers);

/* POST user */
router.post("/user", user.createUser);

module.exports = router;
