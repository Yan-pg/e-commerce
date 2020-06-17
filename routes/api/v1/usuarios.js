const router = require("express").Router()
const auth = require("../../auth")
const UsuarioController = require("../../../controllers/usuarioController")
const { route } = require("./v1")

const usuarioController =  new UsuarioController()
router.get("/", auth.required, usuarioController.index)
router.get("/:id", auth.required, usuarioController.show)

router.post("/login", usuarioController.login)
router.post("/registrar", usuarioController.store)
router.put("/", auth.required, usuarioController.update)
router.delete("/", auth.requered, usuarioController.remove)


router.get("/recuperar-senha", usuarioController.showRecovery)
router.post("/recuperar-senha", usuarioController.createRecovery)
router.get("/senha-recuperada", usuarioController.showCompleteRecovery)
router.post("/senha-recuperada", usuarioController.completeRecovery)

module.exports = router