const UserModel = require("../Model/UserModel")
const jwt = require("jsonwebtoken")
const { SEC_KEY } = process.env

module.exports.signup = async function (req, res) {
    let firstname = req.body.firstname
    let email = req.body.email
    let password = req.body.password
    let user = new UserModel(req.body)
    let data = await user.save()
    res.json({ "msg": "SignUpDone", data: user, rcode: 200 })
}

module.exports.login = async function (req, res) {
    let email = req.body.email
    let password = req.body.password
    let user = await UserModel.findOne({ email: email })
    if (user && user.password == password) {
        // token = parseInt(Math.random() * 1000)
        // user.token = token
        token = jwt.sign({ "authId":user._id,"authority":"user"},SEC_KEY,{expiresIn:"60s"})
        console.log("Token:- "+token);
        res.json({ data: user, msg: "Login done", rcode: 200 })
    } else {
        res.json({ data: req.body, msg: "Invalid Credentials", rcode: -9 })
    }
}
