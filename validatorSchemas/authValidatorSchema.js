const { body } = require('express-validator');

const registerValidator = [
    body('name').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('gender').notEmpty()
]

const loginValidator = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
]

const changePasswordValidator = [
    body('old_password').notEmpty(),
    body('password').notEmpty(),
]

module.exports = {
    registerValidator,
    loginValidator,
    changePasswordValidator
}