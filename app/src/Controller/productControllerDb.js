const ProductModel = require("../Model/ProductModel")
function addProduct(req, res) {
    let pname = req.body.pname
    let price = req.body.price
    let qty = req.body.qty
    let categoryId = req.body.categoryId
    let product = new ProductModel({
        "pname": pname,
        "price": price,
        "qty": qty,
        "categoryId": categoryId
    })
    product.save().then(data => {
        res.json({ "msg": "Product Added", "data": data, "rcode": 200 })
    }).catch(err => {
        res.json({ "msg": "Product not added", "data": err, "rcode": -9 })
    })
}
// GetAllProducts
module.exports.getAllProducts = function (req, res) {
    ProductModel.find().populate("categoryId").exec().then((data) => {
        res.json({ "msg": "All Products Fetched", "data": data, "rcode": 200 })
    }).catch((err) => {
        res.json({ "msg": "Error Fetching Products", "data": err, "rcode": -9 })
    })
}

// GetProductbyID
module.exports.getProductbyId = function (req, res) {
    let productId = req.params.productId
    ProductModel.findById({ _id: productId }).then((data) => {
        res.json({ "msg": "Product ret", "data": data, "rcode": 200 })
    }).catch((err) => {
        res.json({ "msg": "Error Fetching ProductById", "data": err, "rcode": -9 })
    })
}

//deleteById
module.exports.deleteProductbyId = function (req, res) {
    let productId = req.params.productId
    ProductModel.findByIdAndDelete({ _id: productId }).then((data) => {
        res.json({ "msg": "Product ret", "data": data, "rcode": 200 })
    }).catch((err) => {
        res.json({ "msg": "SMW", "rcode": -9, "data": err })
    })
}

//updateProductById
module.exports.updateProductById = function (req, res) {
    let productId = req.body.productId
    let price = req.body.price
    let qty = req.body.qty
    ProductModel.updateOne({ _id: productId }, { "price": price, "qty": qty }).then((data) => {
        res.json({ "msg": "Product updated", "data": data, "rcode": 200 });
    }).catch((err) => {
        res.json({ "msg": "Something went wrong", "data": err, "rcode": -9 });
    });
}

module.exports.filterproducts = function (req, res) {
    let minprice = req.body.minprice
    let maxprice = req.body.maxprice
    ProductModel.find({
        $and: [
            {
                price: { $gt: minprice }
            },
            {
                price: { $lt: maxprice }
            }
        ]
    }).then(data => {
        if (data.length == 0)
            res.json({ "msg": "No Products Found", "data": req.body, "rcode": 200 })
        else
            res.json({ "msg": "Products Filtered", "data": data, "rcode": 200 })
    }).catch(err => {
        res.json({ "msg": "Error Fetching Products", "data": err, "rcode": -9 })
    })
}
module.exports.addProduct = addProduct