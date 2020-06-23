const BaseJoi = require("joi")
const Extension = require("joi-date-extensions")
const Joi = BaseJoi.extend(Extension)


const UsuarioValidation ={
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
}
module.exports = {
    UsuarioValidation
}