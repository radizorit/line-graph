/* PLAIN ENGLISH PROJECT DESCRIPTION
Open high, close low, and price value of the past year
Time period up to me (1hr increment for past year)
 
Load one month at a time
Call glassnode to call data one month at a time for 12 months in 1 hour increment. use delay in between each
30 requests per minute, rest 2 seconds in between
console.log OR store in mongo
*/

// const fs = require('fs')
const fs = require('fs')
const axios = require('axios')
const mongoose = require('mongoose')
const RSI = require('technicalindicators').RSI;
const MACD = require('technicalindicators').MACD;
// import { privateDecrypt } from "crypto"
// import { lchown } from "fs"
// // import { mainModule } from "process";
// import { useDebugValue } from "react"

/* Mongo stuff
mongoose.connect('mongodb://localhost:27017/DataETH', { useNewUrlParser: true, useUnifiedTopology: false })
    .then(() => {
        console.log("CONNECTION OPEN!!! ETH VERSION")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const DataETH = new mongoose.Schema({
    startTime: Date,
    time: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number
});

const ETH = mongoose.model('ETH', DataETH);
*/

; (async apiCall => { //semi colon is there because node messes it up //immediate invoked function
    try {
        let key = 'AWITRktHcJu9MKK1u-ZFNemznYtryC-HEf0fruMd' //&api_key=
        let secret = '551G006Hg5lDAuDUtO15Qai3EuKFu7nqYxnl4ErV' //changed for FTX
        let start = '1627776000'//'1609459200' //January 1, 2021 //1633046400 is october 1st //1622505600 is june 1st //1627776000 for august 1
        let ending = '1640995199' //December 31,2021
        let endpoint = 'https://ftx.com/api'
        let market_name = 'ETH/USD'
        let resolution = 86400 //3600 is 1hr, 14,400 is 4hr, and 1 day is 86400
        let response = await axios({
            method: 'get',
            url: `${endpoint}/markets/${market_name}/candles?resolution=${resolution}&start_time=${start}&end_time=${ending}`
        })
        let resData = Array.from(Object.values(response.data)[1])

        const generator = (arr) => {
            let start = Date.now()
            let resultArray = []
            for (let i = 0; i < arr.length; i++) {
                resultArray.push(resData[i].startTime
                    + ',' + resData[i].time
                    + ',' + resData[i].open
                    + ',' + resData[i].high
                    + ',' + resData[i].low
                    + ',' + resData[i].close
                    + ',' + resData[i].volume)
            }
            console.log(resultArray)
            fs.writeFileSync(`dataETH.csv`, resultArray.join('\n'))
            console.log('Saved! Time to generate: ' + (Date.now() - start));
        }
        // generator(resData)

        const csvRead = (csvFile) => {
            let rawData = fs.readFileSync(csvFile)
            let fileData = rawData.toString()
            let startTime = [],
                time = [],
                open = [],
                high = [],
                low = [],
                close = [],
                volume = []

            let rows = fileData.split('\n')
            for (let i = 0; i < rows.length; i++) {
                startTime.push(rows[i].split(',')[0])
                time.push(rows[i].split(',')[1])
                open.push(Number(rows[i].split(',')[2]))
                high.push(rows[i].split(',')[3])
                low.push(rows[i].split(',')[4])
                close.push(rows[i].split(',')[5])
                volume.push(rows[i].split(',')[6])
            }
            //return { startTime, time, open, high, low, close, volume }
            return [indicatorMACD(open), indicatorRSI(open)]
        }

        const indicatorRSI = (arr) => {
            let inputRSI = {
                values: arr,
                period: 14
            }
            return RSI.calculate(inputRSI)
        }

        const indicatorMACD = (arr) => {
            let inputMACD = {
                values: arr,
                fastPeriod: 5,
                slowPeriod: 8,
                signalPeriod: 3,
                SimpleMAOscillator: false,
                SimpleMASignal: false
            }
            return MACD.calculate(inputMACD)
        }
        console.log(csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\LineGraph\\line-graph\\public\\dataETH.csv'))
    } catch (error) {
        console.log(error)
    }
})()

function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    })
}

// setTimeout(() => {
//     this.setState({ text: '5 Seconds Passed' })
// }, 5 * 1000) //2 argument first is function

//     async getCSV(fileName, colorIndex) {
//     try {
//         let response = await axios({
//             method: 'get',
//             url: fileName
//         })
//         this.csvParse(response.data, fileName.slice(1, 5), colorIndex)
//         //update state when resp is done
//     } catch (error) {
//         console.log(error)
//     }
// }