const jwt = require("jsonwebtoken")
const { SEC_KEY } = process.env

module.exports = function (req, res, next) {
    jwt.verify(req.headers.token, SEC_KEY, function (err, decoded) {
        if (err) {
            res.json({ msg: "Please Login before acccess the service", rcode: -9, data: "" })
        }
        else {
            console.log("decoded => ",decoded);
            next();
        }
    })
}