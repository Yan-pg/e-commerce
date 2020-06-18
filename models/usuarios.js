const mongoose = require("mongoose"),
    Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const secret = require("../config").secret

const UsuarioSchema = new mongoose.Schema ({
    nome: {
        type: String,
        require:[true, "Não pode ficar vazio."]
    },
    email : {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Não pode ficar vazio."],
        index: true
    },
    loja: {
        type: Schema.Types.ObjectId,
        ref: "Loja",
        required: [true, "Não pode ficar vazia"]
    },
    permissao: {
        typre: Array,
        default: ["cliente"]
    },
    hash: String,
    salt: String,
    recovery: {
        type: {
            token: String,
            date: Date
        },
        default: {}
    }
},{ timestamps: true })

UsuarioSchema.plugin(uniqueValidator, {message: "já está sendo utilizado"})

UsuarioSchema.methods.setSenha = function(passoword){
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(passoword, this.salt, 1000, 512, "sha512").toString("hex")
}

UsuarioSchema.methods.validarSenha = function(passoword){
    const hash = crypto.pbkdf2Sync(passoword, this.salt, 1000, 512, "sha512").toString
    return hash === this.hash
}

UsuarioSchema.methods.gerarToken = function(){
    const hoje = new Data()
    const exp = new Data(today)
    exp.setDate(today.getDate() + 15)

    
    return jwt.sign({
        id: this._id,
        email: this.email,
        nome: this.nome,
        exp: parseFloat(exp,getTime() / 1000, 10)
    }, scret)
}
UsuarioSchema.methods.enviarAuthJSON = function(){ 

    return { 
            _id: this._id, 
            nome: this.nome, 
            email: this.email, 
            loja: this.loja, 
            role: this.permissao, 
            token: this.gerarToken() 
    }; 
};
// RECUPERARCAO
UsuarioSchema.methods.criarTokennRecuperacaoSenha = function(){
    this.recovery = {}
    this.recovery.token = crypto.randomBytes(16).toString("hex")
    this.recovery.date = new Date(new Date().getTime() + 24*60*1000)
    return this.recovery
}
UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function(){
    this.recovery = { token: null, date: null }
    return this.recovery
}

module.exports = mongoose.model("Usuario", UsuarioSchema)