const fs = require("fs")
const CsvReader = require("csv-reader");
const IndustryModel = require("../Model/IndustryModel");
const EquityModel = require("../Model/EquityModel");

function readfile() {
    let myFile = fs.createReadStream("D:\\MEAN 2023\\MEAN-2\\app\\src\\Seed\\ind_nifty50list.csv", "utf8") // fopen("data.txt","r") 
    myFile
        .pipe(new CsvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            console.log('A row arrived: ', row[0]);
        })
        .on('end', function () {
            console.log('No more rows!');
        });
}

module.exports.uploadIndustry = async function () {
    let industryArray = []
    let myFile = fs.createReadStream("D:\\MEAN 2023\\MEAN-2\\app\\src\\Seed\\ind_nifty50list.csv", "utf8") // fopen("data.txt","r") 
    let myDataFromDb = []
    IndustryModel.find().then(data => {
        myDataFromDb = data
    })
    let promise = new Promise((resolve, reject) => {
        myFile.pipe(new CsvReader())
            .on('data', function (row) {
                if (industryArray.indexOf(row[1].toLowerCase()) == -1) {
                    industryArray.push(row[1].toLowerCase())
                }
            })
            .on('end', function () {
                console.log(industryArray);
                console.log("\n" + industryArray.length);
                let industryJson = []
                for (i = 0; i < myDataFromDb.length; i++) {
                    if (industryArray.indexOf(myDataFromDb[i].name.toLowerCase()) != -1) {
                        delete industryArray[industryArray.indexOf(myDataFromDb[i].name)]
                    }
                }
                industryArray.forEach(item => industryJson.push({ "name": item }))
                resolve(industryJson) //return 
            })
    })
    let data = await promise;
    console.log("THE END");
    return data;
}


//equity 
module.exports.uploadEquity = async function () {
    let eqArray = [] 
    let myFile = fs.createReadStream("D:\\MEAN\\Seed\\ind_nifty50list.csv", "utf8")
    let industryDb = []
    let equityDb = [] 
    IndustryModel.find().then(data => {
        industryDb = data;
    })

    await EquityModel.find({}, { _id: 0, name: 1 }).then(data => {
        data.forEach(item => equityDb.push(item.name))
    })

    let promise = new Promise((resolve, reject) => {
        myFile.pipe(new CsvReader())
            .on('data', function (row) {
                let industryName = row[1]
                for (let i = 0; i < industryDb.length; i++) {
                    if (industryDb[i].name.toLowerCase() == industryName.toLowerCase() && equityDb.indexOf(row[0].toLowerCase()) == -1) {
                        let eq = { name: row[0], symbol: row[2], isin: row[4], industryId: industryDb[i]._id }
                        eqArray.push(eq);
                    }
                }
            })
            .on('end', function () {
                resolve(eqArray)
            })
    })
    let data = await promise;
    console.log("THE END");
    return data;
}