const express = require("express")
const productController = require("../Controller/productControllerDb")
const route = express.Router()

route.post("/addProduct", productController.addProduct)
route.get("/getAllProducts", productController.getAllProducts)
route.get("/getProductbyId/:productId", productController.getProductbyId)
route.delete("/deleteProductbyId/:productId", productController.deleteProductbyId)
route.put("/updateProductById", productController.updateProductById)
route.post("/products/filter", productController.filterproducts)

module.exports = route 