const router = require("express").Router()
const auth = require("../../auth")
const UsuariController = require("../../controllers/UsuarioController")
const { route } = require("./v1")

const usuariController =  new UsuarioController()
router.get("/", auth.required, usuariController.index)
router.get("/:id", auth.required, usuariController.show)

router.post("/login", usuariController.login)
router.post("/registrar", usuariController.store)
route.put("/", auth.required, usuariController.update)
router.delete("/", auth.requered, usuariController.remove)


router.get("/recuperar-senha", usuariController.showRecovery)
router.post("/recuperar-senha", usuariController.createRecovery)
router.get("/senha-recuperada", usuariController.showCompleteRecovery)
router.post("/senha-recuperada", usuariControllerc.completeRecovey)

module.exports = router