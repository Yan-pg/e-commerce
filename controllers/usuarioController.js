const mongoose = require("mongoose")
const Usuario = mongoose.model("Usuario")
//const enviarEmailRecovery = require("../helpers/email-recovery")
const usuarios = require("../models/usuarios")

class UsuarioContrller {
    //Get
    index(req, res, next){
       Usuario.findById(req.payload.id).then(usuario => {
           if(!usuarios) return res.status(401).json({ errors: "Usuario não registrado"})
           return res.json({ usuario: usuario.enviarAuthJSON() })
       }).catch(next)
    }

    //GET /:ID
    show(req, res, next){
        Usuario.findById(req.params.id).populate({ path: "loja "}).then(usuario => {
            if(!usuario) return res.status(401).json({errors: "usuarios não registrado"})
            return res.json({
                usuario: {
                    nome: usuario.nome,
                    email:usuario.email,
                    permissao: usuario.permissao,
                    loja: usuario.loja
                }
            })
        }).catch(next)
    }

    //POST /registrar

    store(req, res, next){
        const { nome, email, password} = req.body

        if( !nome || !email || !password) return res.status(422).json({ errors: "Preecha todos os campos de cadastro"})

        const usuario = new Usuario({ nome, email })
        usuario.setSenha(password)

        usuario.save()
        .then(() => res.json({ usuario: usuario.enviarAuthJSON() }))
        .catch(next)
    }


    //PUT /

    update(req, res, next){
        const { nome, email, password } = req.body
        Usuario.findById(req, payload.id).then((usuario) => {
            if(!usuario) return res.status(401).json({errors: "Usuario nao registrado"})
            if(typeof nome!== "undefined") usuario.nome = nome
            if(typeof email!== "undefined") usuario.email = email
            if(typeof password!== "undefined") usuario.setSenha(password)
            
            return usuario.save().then(() =>{
                return res.json({ usuario: usuario.enviarAuthJSON() })
            }).catch(next)
        }).catch(next)
    }
    //DELETE /

    remove(req, res, next){
        Usuario.findById(req.payload.id).then(usuario => {
            if(!usuario) return res.status(401).json({ erros: "Usuario não registrado"})
            return usuario.remove().then(()=> {
                return res.json({ deletado: true })
            }).catch(next)
        }).catch(next)
    }

    //POST/ login
    login(req, res, next){
        const {email, password} = req.body
        if(!email) return res.status(422).json({ errors: { email: "não pode ficar varzio" }})
        if(!password) return res.status(422).json({ errors: { password: "não pode ficar varzio" }})
        Usuario.findOne({email}).then((usuario) => {
            if(!usuario) return res.status(401).json({ erros: "Usuario não registrado"})
            if(!usuario.validarSenha(password)) return res.status(401).json({ errors: "Senha inválida"})
            return res.json({ usuario: usuario.enviarAuthJSON()})
        }).catch(next)
    }

    //RECOVERY
    
    //get/ recuperar-senha
    showRecovery(req, res, next){
        return res.render('recovery', { error: null, sucess: null})
    }

    createRecovery(req, res, next){
        const { email } = req.body
        if(!email) return res.render('recovery', {error: "Preencha com seu email", success: null})
    
        Usuario.findOne({email}).then((usuario) => {
            if(!usuario) return res.render("recovery", {error: "Não existe usuário com este email", seccess: null})
            const recoveryDate = usuario.criarTokenRecuperacaoSenha()
            return usuario.save().then(() => {
                return res.render("recovery", { error: null, success: true})
            }).catch(next)
        }).catch(next)
    }
    //GET /senha-recuperada
    showCompleteRecovery(req, res, next){
        if(!req.query.token) return res.render("recovery", { error: "Token não identificado", success: null})
        Usuario.findOne({ "recovery.token": req.query.token }).then(usuario => {
            if(!usuario) return res.render("recovery", { error: "Não ecciste usuário com este token", success:null})
            if( new Date(usuario.recovery.date) < new Date()) return res.render("recovery", {error: "Token expirado novamente.", success: null}) 
            return res.render("recovery/store", { error:null, soccess: null, token: req.query.token})
        }).catch(next)
    }

    //POST / senha-recuperada
    completeRecovery(req, res, next){
        const{ token, password } = req.body
        if(!token ||!password) return res.render("recovery/store", { error: "preencha novamente com sua nova senha", success: null, token: token})
        Usuario.findOne({"recovery.token": token }).then(usuario => {
            if(!usuario) return res.render("recovery", { error: "Usuario nao indentificado", success: null})
          

            usuario.finalizarTokenRecuperarcaoSenha()
            usuario.setSenha(password)
            return usuario.save().then(() => {
                return res.render("recovery/store", {
                    error: null,
                    success: "Senha alterada com sucesso. Tente novamente fazer o login.",
                    token: null
                })
            }).catch(next)
        })
    }
}
module.exports = UsuarioContrller