const mongoose = require("mongoose")
require('dotenv').config()
const { MONGO_LIVE_URI } = process.env

module.exports.getDbConnection = function () {
    mongoose.connect(MONGO_LIVE_URI).then(() => console.log("DbConnected")).catch(() => console.log("DbConnection Fail"))
}