const User = require("../models/UserModel");
const dataset = require("../dataset/user.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await User.create([
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

module.exports = {
    uploadData,
};