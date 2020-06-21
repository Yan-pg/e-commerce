const router = require("express").Router()
const auth = require("../../auth")
const UsuarioController = require("../../../controllers/usuarioController") 

const usuarioController =  new UsuarioController()


router.post("/login", usuarioController.login) // Só me retorna senha inválida 
router.post("/registrar", usuarioController.store) //OK
router.put("/", auth.required, usuarioController.update) // "message": "req is not defined"
router.delete("/", auth.required, usuarioController.remove)// "message": "req is not defined"


router.get("/recuperar-senha", usuarioController.showRecovery) // usuario.criarTokenRecuperacaoSenha is not a function
router.post("/recuperar-senha", usuarioController.createRecovery)// usuario.criarTokenRecuperacaoSenha is not a function
router.get("/senha-recuperada", usuarioController.showCompleteRecovery) // usuario.criarTokenRecuperacaoSenha is not a function
router.post("/senha-recuperada", usuarioController.completeRecovery) // usuario.criarTokenRecuperacaoSenha is not a function


router.get("/", auth.required, usuarioController.index) // "message": "req is not defined"
router.get("/:id", auth.required, usuarioController.show)   // "message": "req is not defined"

module.exports = router