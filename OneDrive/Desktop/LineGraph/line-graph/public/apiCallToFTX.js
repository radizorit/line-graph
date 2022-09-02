import fs from 'fs'
import axios from 'axios'

    ; (async apiCall => { //semi colon is there because node messes it up //immediate invoked function
        let market_name = 'ETH/USD'
        let ticker = market_name.slice(0, 3)
        try {
            let key = 'AWITRktHcJu9MKK1u-ZFNemznYtryC-HEf0fruMd' //&api_key=
            let secret = '551G006Hg5lDAuDUtO15Qai3EuKFu7nqYxnl4ErV' //changed for FTX
            let start = new Date()//'1609459200' //January 1, 2021 //1633046400 is october 1st //1622505600 is june 1st //1627776000 for august 1
            let ending = '1640995199' //1640995199 is December 31,2021 //1619395199 february 25?
            //april 25th end 1619395199	
            let endpoint = 'https://ftx.com/api'

            let resolution = 14400 //3600 is 1hr, 14,400 is 4hr, and 1 day is 86400
            let response = await axios({
                method: 'get',
                // url: `${endpoint}/markets/${market_name}/candles?resolution=${resolution}&start_time=${start}&end_time=${ending}`
                url: `${endpoint}/markets/${market_name}/candles?resolution=${resolution}`
                // url: `${endpoint}/markets/${market_name}/orderbook?depth=1`
                // url: `${endpoint}/nft/nfts`
            })
            let resData = Array.from(Object.values(response.data)[1])
            console.log(resData[resData.length - 1].close)
            //     const generator = (arr) => {
            //         let start = Date.now()
            //         let resultArray = []
            //         for (let i = 0; i < arr.length; i++) {
            //             resultArray.push(resData[i].startTime
            //                 + ',' + resData[i].time
            //                 + ',' + resData[i].open
            //                 + ',' + resData[i].high
            //                 + ',' + resData[i].low
            //                 + ',' + resData[i].close
            //                 + ',' + resData[i].volume)
            //         }
            //         // console.log(resultArray)
            //         fs.writeFileSync(`${ticker}.csv`, resultArray.join('\n'))
            //         console.log('Saved! Time to generate: ' + (Date.now() - start));
            //     }
            //     generator(resData)

            // } catch (error) {
            //     console.log(error)
        } catch (e) {
            console.log(e)
        }
    })()
