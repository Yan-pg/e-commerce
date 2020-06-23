const router = require("express").Router()
const auth = require("../../auth")
const UsuarioController = require("../../../controllers/usuarioController") 

const Validation = require("express-validation")
const {UsuarioValidation} = require("../../../controllers//validacoes/usuarioValidation")

const usuarioController =  new UsuarioController()

router.post("/login", Validation(UsuarioValidation.login),usuarioController.login) // TESTADO
router.post("/registrar", usuarioController.store) // TESTADO
router.put("/", auth.required, usuarioController.update) // TESTADO
router.delete("/", auth.required, usuarioController.remove)// TESTADO


router.get("/recuperar-senha", usuarioController.showRecovery) // usuario.criarTokenRecuperacaoSenha is not a function
router.post("/recuperar-senha", usuarioController.createRecovery)// usuario.criarTokenRecuperacaoSenha is not a function
router.get("/senha-recuperada", usuarioController.showCompleteRecovery) // usuario.criarTokenRecuperacaoSenha is not a function
router.post("/senha-recuperada", usuarioController.completeRecovery) // usuario.criarTokenRecuperacaoSenha is not a function


router.get("/", auth.required, usuarioController.index) // "message": "req is not defined"
router.get("/:id", auth.required, usuarioController.show)   // "message": "req is not defined"

module.exports = router