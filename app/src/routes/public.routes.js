const express = require("express")
const sessionControllerDb = require("../Controller/SessionControllerdb")

const router = express.Router()

router.post("/signupdb", sessionControllerDb.signup)
router.post("/login", sessionControllerDb.login)
router.get("/getallusers", sessionControllerDb.getAllusers)

module.exports = router