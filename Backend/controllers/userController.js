const User = require("../models/User");

exports.registerUser = async (req, res) => {

    const { name, registerNumber, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const user = new User({
        name,
        registerNumber,
        email,
        phone,
        password,
        role,
    });

    await user.save();

    return res.status(201).json({
        message: "User Registered Successfully",
        user,
    });

};