const CategoryModel = require("../Model/CategoryModel")
module.exports.addCategory = function (req, res) {
    let category = new CategoryModel({
        categoryname: req.body.categoryname
    })
    category.save().then((data) => {
        res.json({ "msg": "Category Save ", "data": data, "rcode": 200 })
    }).catch((err) => {
        res.json({ "msg": "SMW ", "data": err, "rcode": -9 })
    })
}

// getAllCategory
module.exports.getAllCategory = function(req,res){
    CategoryModel.find().then(data=>{
        res.json({"msg":"All Categories","data":data,"rcode":200})
    }).catch(err=>{
        res.json({"msg":"SMW","data":err,"rcode":-9})
    })
}

// getCategoryById
module.exports.getCategoryById = function(req,res){
    let categoryId = req.params.categoryId
    CategoryModel.findById(categoryId).then(data=>{
        res.json({"msg":"Category By Id","data":data,"rcode":200})
    }).catch(err=>{
        res.json({"msg":"SMW","data":err,"rcode":-9})
    })
}

// updateCategory
module.exports.updateCategorybyid = function(req,res){
    let categoryId = req.body.categoryId
    let categoryname = req.body.categoryname
    CategoryModel.updateOne({_id:categoryId},{"categoryname":categoryname}).then(data=>{
        res.json({"msg":"Category Updated","data":data,"rcode":200})
    }).catch(err=>{
        res.json({"msg":"SMW","data":err,"rcode":-9})
    })
}

//deleteCategorybyID
module.exports.deleteCategorybyid = function(req,res){
    let categoryId = req.params.categoryId
    CategoryModel.findByIdAndDelete(categoryId).then(data=>{
        res.json({"msg":"Category Deleted","data":data,"rcode":200})
    }).catch(err=>{
        res.json({"msg":"SMW","data":err,"rcode":-9})
    })
}