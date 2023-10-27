const User = require("../models/UserModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.formatter.ok(users);
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { nama, email } = req.body;
    const newUser = await User.create({
      nama,
      email,
    });
    console.log(newUser);
    res.formatter.ok(newUser);
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

module.exports = {
  getUsers,
  createUser,
};
