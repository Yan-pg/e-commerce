const Joi = require("joi")

const CategoriaValidation = {
    index: {
        query: {
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    indexDisponiveis: {
        query: {
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    show: {
        query: {
            loja: Joi.string().alphanum().length(24).required()
        },
        params: {
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        body: {
            nome: Joi.string().required(),
            codigo: Joi.string().required()
        }
    },
    update: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        },
        body: {
            nome: Joi.string().required(),
            codigo: Joi.string().required(),
            disponibilidade: Joi.boolean().optional(),
            produtos: Joi.array().items( Joi.string().alphanum().length(24).optional())
        }
    },
    remove: {
        body: {
            nome: Joi.string().required(),
            codigo: Joi.string().required()
        }
    }

}

module.exports = {CategoriaValidation}