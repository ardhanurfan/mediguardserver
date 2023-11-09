const User = require("../models/UserModel");

const uploadData = async (req, res) => {
  try {
      await dataset.forEach(async (element) => {
          await Unit.create([
              {
                  namaLengkap: element.namaLengkap,
                  email: element.email,
                  password: element.role,
                  role: element.role
              },
          ]);
      });
      res.formatter.ok("Upload data done");
  }catch (error) {
      console.log(error);
      return res.status(500).send({message:"Error"});
  }
};

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
