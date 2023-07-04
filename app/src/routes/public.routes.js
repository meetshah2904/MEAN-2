const express = require("express")
const sessionControllerDb = require("../Controller/SessionControllerdb")

const router = express.Router()

router.post("/signupdb", sessionControllerDb.signup)
router.post("/login", sessionControllerDb.login)

module.exports = router