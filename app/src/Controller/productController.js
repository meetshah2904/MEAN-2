let products = []
function addProduct(req, res) {
    let pname = req.body.pname
    let price = req.body.price
    let qty = req.body.qty
    let productId = parseInt(Math.random() * 100)
    let product = {
        "productId": productId,
        "pname": pname,
        "price": price,
        "qty": qty
    }
    products.push(product)
    res.json({ "msg": "Product Added", "data": product, "rcode": 200 })
}

function getAllProducts(req, res) {
    res.json({ "msg": "View all products", "data": products, "rcode": 200 })
}

function deleteProductById(req, res) {
    let productId = req.params.productId
    let oldLength = products.length 
    products = products.filter(p => p.productId != productId)
    let newLength = products.length
    if (oldLength == newLength){
        res.json({ "msg": "Invalid Product Id", "data": productId, "rcode": -9 })    
    } 
    else {
        res.json({ "msg": "Product Deleted", "data": productId, "rcode": 200 })
    }
}
function viewProductById(req,res){
    let productId = req.params.productId
    let product = products.find(p => p.productId == productId);
    if(product){
        res.json({ "msg": "Product found", "data": product, "rcode": 200 });
    }
    else{
        res.json({ "msg": "Product Not found", "data": product, "rcode": -9 });
    }
}

module.exports.addProduct = addProduct
module.exports.getAllProducts = getAllProducts
module.exports.deleteProductById = deleteProductById
module.exports.viewProductById = viewProductById