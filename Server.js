const express = require("express")
require("./app/src/config/dbConfig").getDbConnection()

const categoryroute = require("./app/src/routes/category.routes")
const productroute = require("./app/src/routes/products.routes")
const publicroute = require("./app/src/routes/public.routes")
const authMiddleware = require("./app/src/middleware/auth.middleware")
const app = express()
//Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//private => authentication
app.use("/admin",authMiddleware,categoryroute)
app.use("/admin",authMiddleware,productroute)

// public
app.use("/public",publicroute)
app.listen(9999)
console.log("server started 9999");