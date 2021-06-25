const joi = require("joi");

const registerValidation = (req, res, next) => {
    try {
        const schema = joi.object().keys({
            name: joi.string().required().min(6),
            email: joi.string().min(7).email().required(),
            password: joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        next();
    } catch (error) {
        res.status(500).json({ message: "Schema Validation error" });
    }
};

const loginValidation = (req, res, next) => {
    try {
        const schema = joi.object().keys({
            email: joi.string().min(7).email().required(),
            password: joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        next();
    } catch (error) {
        res.status(500).json({ message: "Schema Validation error" });
    }
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;