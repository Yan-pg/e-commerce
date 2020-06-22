const router = require("express").Router()
const LojaValidation = require("../../../controllers/validacoes/lojaValidation")
const auth = require("../../auth")
const LojaController = require("../../../controllers/LojaController") 
const lojaValidation = require("../../../controllers/validacoes/lojaValidation")


const lojaController = new LojaController()

router.get("/", lojaController.index) // TESTADO
router.get("/:id", lojaController.show) // TESTADO

router.post("/", auth.required, lojaController.store) // TESTADO
router.put("/:id", auth.required, lojaValidation ,lojaController.update) // TESTADO
router.delete("/:id", auth.required, lojaValidation ,lojaController.remove) // TESTADO


module.exports = router