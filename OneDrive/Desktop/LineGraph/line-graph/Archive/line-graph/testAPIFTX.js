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
// const SMA = require('technicalindicators').SMA;
const axios = require('axios')
// const mongoose = require('mongoose')
// const RSI = require('technicalindicators').RSI;
const React = require('react')
const Line = require('react-chartjs-2')
    // const MACD = require('technicalindicators').MACD;
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
            let start = '1609459200'//'1609459200' //January 1, 2021 //1633046400 is october 1st //1622505600 is june 1st //1627776000 for august 1
            let ending = '1634255999' //1640995199 is December 31,2021
            let endpoint = 'https://ftx.com/api'
            let market_name = 'BTC/USD'
            let resolution = 14400 //3600 is 1hr, 14,400 is 4hr, and 1 day is 86400
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
                // console.log(resultArray)
                fs.writeFileSync(`dataETH.csv`, resultArray.join('\n'))
                console.log('Saved! Time to generate: ' + (Date.now() - start));
            }
            generator(resData)

            const csvRead = (csvFile, index) => {
                let rawData = fs.readFileSync(csvFile)
                let fileData = rawData.toString()
                let dataField = []
                //startTime = 0, time = 1, open = 2, high = 3, low = 4, close = 5, volume = 6
                let rows = fileData.split('\n')
                for (let i = 0; i < rows.length; i++) {
                    if (index != 0 && index != 1) {
                        dataField.push(Number(rows[i].split(',')[index]))
                    } else dataField.push(rows[i].split(',')[index])
                }
                return dataField
            }

            let startTime = csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Test\\dataETH.csv', 0)
            let openPrices = csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Test\\dataETH.csv', 2)
            let closePrices = csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Test\\dataETH.csv', 5)
            let highPrices = csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Test\\dataETH.csv', 3)
            let lowPrices = csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Test\\dataETH.csv', 4)
            let volume = csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Test\\dataETH.csv', 6)

            //Identify buy and sell through 3 key things:
            //1) Wicks
            //A)close and low
            //high then close then open then low
            let topWickLength = []
            let bottomWickLength = []
            const wicks = (openPrices, closePrices, highPrices, lowPrices, startTime) => {
                for (let i = 0; i < highPrices.length; i++) {
                    topWickLength.push(Math.abs(Math.max(closePrices[i], openPrices[i]) - highPrices[i]))
                    bottomWickLength.push(Math.abs(Math.min(closePrices[i], openPrices[i]) - lowPrices[i]))
                }
                return topWickLength, bottomWickLength
                // console.log({ topWickLength, bottomWickLength })
                // console.log(bottomWickLength)
            }
            //2) % change (this will identify stagnation of price on top or creating consolidation/support on bottom)
            //This needs to take into account of time/volume to see where the action traders are looking at
            //A) Say there's a small percentage change within a certain time period (consolidation) AND HIGHER HIGHS --> UPTREND
            //Weaker % change over a longer time frame will indicate short opportunity
            let percentageChangeArray = []
            const percentageChange = (open, close) => {

                //Find % change of the open price
                for (let i = 0; i < open.length; i++) {
                    percentageChangeArray.push(Math.round(((open[i] - close[i]) / open[i]) * 100) / 100)
                }
                return percentageChange
                // console.log('Percentage Change: ', percentageChange)
            }

            //3) Higher highs and lower lows
            //Ideally this is pretty simple and you will compare previous high to current high, their % is key in identifying momentum
            //compare lows, highs, close, and open to ensure that there are lows and highs, probably will take a look at all 4
            //and consider the logic when comparing data
            let localTop = []
            let localBottom = []

            const trendingHighLow = (openPrices, closePrices, highPrices, lowPrices, startTime) => {
                //Local low
                //Has price been consolidating?
                //How many candles around this level?
                /*Check loop logic because i think it might be wrong when it comes to +2 */
                for (let i = 0; i < highPrices.length; i++) {
                    let j = i + 1
                    let k = i + 2
                    if (highPrices[i] > highPrices[j] && highPrices[k] > highPrices[j]) {
                        localTop.push('Local Top')
                    } else {
                        localTop.push('None')
                    }
                }

                for (let j = 0; j < lowPrices.length; j++) {
                    let i = j - 1
                    let k = j + 1
                    /* Might remove k because we should only use calculations on data we have at that time period */
                    if (lowPrices[i] > lowPrices[j] && lowPrices[k] > lowPrices[j]) {
                        localBottom.push('Local Bottom')
                    } else {
                        localBottom.push('None')
                    }
                }
                return localTop, localBottom
            }

            let average = (arr) => {
                let sum = 0
                for (let i = 0; i < arr.length; i++) {
                    sum += arr[i]
                }
                return Math.round(sum / arr.length)
            }

            let arrayRSI = []
            const indicatorRSI = (arr) => {
                let inputRSI = {
                    values: arr,
                    period: 14
                }
                arrayRSI = RSI.calculate(inputRSI)
                for (let i = 0; i < 14; i++) {
                    arrayRSI.unshift(0)
                }
            }

            const combiningArray = (arr, topWickLength, bottomWickLength, percentageChangeArray, localBottom, localTop, avgVolume, closePrices) => {
                let finalArray = []
                for (let i = 0; i < arr.length; i++) {
                    let newMap = {}
                    newMap.startTime = arr[i]['startTime']
                    newMap.time = arr[i]['time']
                    newMap.open = arr[i]['open']
                    newMap.high = arr[i]['high']
                    newMap.low = arr[i]['low']
                    newMap.close = arr[i]['close']
                    newMap.volume = arr[i]['volume']
                    newMap.topWickLength = topWickLength[i]
                    newMap.bottomWickLength = bottomWickLength[i]
                    newMap.percentageChange = percentageChangeArray[i]
                    newMap.localBottom = localBottom[i]
                    newMap.localTop = localTop[i]
                    newMap.avgVolume = avgVolume
                    newMap.avgCloseprices = closePrices
                    newMap.RSI = arrayRSI[i]
                    //Build rail guards to identify if it is above average volume, high, close, local bottom, etc.
                    //percentage change over 3% maybe?
                    //if local bottom, check to see if high bottomwicklength (use %), probably need to strategize more, these are just examples
                    //check if theres indecision (high wicks on both side)
                    if (newMap.localBottom == 'Local Bottom'
                        && newMap.percentageChange >= .03
                        // && ((newMap.bottomWickLength / newMap.low) >= newMap.percentageChange)
                        && ((newMap.volume * .8) > avgVolume)
                        && newMap.RSI <= 50
                    ) {
                        newMap.tradingSignal = 'Buy'
                    } //needs an else if for local top.
                    //Then need to compare results and see if accurate
                    // Will need to implement resistance and support indicators
                    else newMap.tradingSignal = 'None'
                    finalArray.push(newMap)
                }
                // console.log(finalArray[0].volume)
                // console.log(finalArray)
                let filteredArray = finalArray.filter(data => data.tradingSignal == 'Buy')
                // data.time > 1633392000000)

                console.log(filteredArray, filteredArray.length)
            }


            wicks(openPrices, closePrices, highPrices, lowPrices, startTime)
            percentageChange(openPrices, closePrices)
            trendingHighLow(openPrices, closePrices, highPrices, lowPrices, startTime)
            indicatorRSI(closePrices)
            combiningArray(resData, topWickLength, bottomWickLength, percentageChangeArray, localBottom, localTop, average(volume), average(closePrices))


        } catch (error) {
            console.log(error)
        }
    })()

function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    })
}