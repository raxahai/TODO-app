const router = require("express").Router();
const userSchema = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const joi = require("joi");

// Middlewares
const { registerValidation, loginValidation } = require("../utils/validation.js");


router.post("/register", registerValidation, async (req, res) => {
    try {

        // checking if user is already in the db
        const isEmailExist = await userSchema.findOne({ email: req.body.email });
        if (isEmailExist) return res.status(300).json({
            message: "email already exists"
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = userSchema({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await user.save();
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(404).json({
            code: 404,
            message: 'Unable to register user'
        })
    }
});

router.post("/login", loginValidation, async (req, res) => {
    try {
        // checking if user is already in the db
        var user = await userSchema.findOne({ email: req.body.email });
        if (!user) return res.status(301).json({
            message: "email does not exists"
        });

        let validPassword = bcrypt.compare(req.body.password, userSchema.password);
        if (!validPassword) return res.status(301).json({
            message: "Invalid password"
        });

        // create and assign token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE });
        res.header('auth_token', token).send(token);

        // res.send("logged in");

    } catch (error) {
        res.status(404).json({
            code: 404,
            message: "Unable to login"
        });
    }
})

module.exports = router;