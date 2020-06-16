const router = require("express").Router()

router.use("/Usuarios", require("./usuarios"))

module.exports = router