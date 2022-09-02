import axios from 'axios'
import React from 'react'
import { Line } from 'react-chartjs-2'
const RSI = require('technicalindicators').RSI;
const BB = require('technicalindicators').BollingerBands;
const VWAP = require('technicalindicators').VWAP;

//constructor on top, render on bottom, component near top, and function inbetween
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Loading....',
            // labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            labels: [],
            datasets: [],
            visibility: {},
            lengthCount: 0
            // visibility: {} //hash map 
        };
        this.colors = ['grey', 'red', 'green', 'black', 'purple', 'brown', 'orange', 'pink']
        this.renderHeader = this.renderHeader.bind(this)
        this.renderChart = this.renderChart.bind(this)
        this.renderButtons = this.renderButtons.bind(this)
        //this.toggleData = this.toggleData.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ text: '5 Seconds Passed' })
        }, 5 * 1000)
        this.getCSV('/BTC.csv', 0, 0)
        // this.getCSV('/4hS.csv', 0, 1)



        // this.getCSV('/BTC.csv', 0)
        // this.getCSV('/ETH.csv', 0)
        // this.getCSV('/4hB.csv', 0)
        // this.getCSV('/4hE.csv', 0)
        // let left = 0
        // let right = left + 9
        // let timeFrameIndex = 0
        // while (right <= 9) {
        //     this.render(left, right, timeFrameIndex)
        //     left = left + 9
        //     right = right + 9
        //     timeFrameIndex++
        //     // this.renderChart(0, 5)
        //     // this.renderChart(5, 10)
        // }
    }

    async getCSV(fileName, colorIndex, timeFrameIndex) {
        try {
            let response = await axios({
                method: 'get',
                url: fileName
            })
            this.csvParse(response.data, fileName.slice(1, 4), colorIndex, timeFrameIndex)
        } catch (error) {
            console.log(error)
        }
    }
    /*
NEED TO DO:
    1) bollinger bands for top and bottom -FUCKING DONE!
    2) Signals for buy / sell -- FUCKING DONE! WILL NEED TO ADJUST
    3) need to identify key supports and resistances-- this will require CLEAR AND EXACT LEVELS
        A) support / resistance -- maybe use wicks + a system for count of a local bottom / local top
    4) After mapping out key supports/resistances levels then if there's multiple signals of sell
        ,consider it is a bullish sign because we are judging our sell algo based on the upper BB
        sell signal could be peak, bollinger band going aggressively on top (good for buying), 
CALCULATIONS:
    1) RSI -- FUCKING DONE
    2) wicks -- FUCKING DONE
    3) percentage change -- FUCKING DONE
    4) trending
        a) higher high
        b) lower low
    5) Avg of the following: DONE
        a) price
        b) volume
        c) high/low?
    6) Machine learning ? Calculation based on previous values 
    7) supports / resistances AND BB of uptrends and downtrends
*/
    csvParse(csvFile, ticker, colorIndex, timeFrameIndex) {
        let startTime = []
        let time = []
        let open = []
        let high = []
        let low = []
        let close = []
        let volume = []

        let rows = csvFile.split('\n')
        for (let i = 0; i < rows.length; i++) {
            startTime.push(rows[i].split(',')[0].slice(0, 10))
            time.push(rows[i].split(',')[1])
            open.push(Number(rows[i].split(',')[2]))
            high.push(Number(rows[i].split(',')[3]))
            low.push(Number(rows[i].split(',')[4]))
            close.push(Number(rows[i].split(',')[5]))
            volume.push(Number(rows[i].split(',')[6]))
            //create one for bollinger band?
        }
        let newMap = {
            // startTime: startTime,
            // time: time,
            // open: open,
            // high: high,
            // low: low,
            // close: close,
            // volume: volume,
            visibility: true,
            label: ticker,
            data: close,
            borderColor: this.colors[colorIndex],
            pointRadius: null,
            thickness: 500,
            timeFrameIndex: timeFrameIndex,
            borderWidth: 1

            // data: bottomVisibility,
            // backgroundColor: this.colors[2],
            // borderColor: this.colors[2],
            // pointRadius: bottomWickColor,
            // visibility: bottomWickColor,
            // showLine: false,
            // label: 'Buy',
            // thickness: 100,
            // timeFrameIndex: timeFrameIndex
        }

        let input = {
            period: 14,
            values: close,
            stdDev: 2
        }
        let inputRSI = {
            values: close,
            period: 14
        }
        const vwap = new VWAP({
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume
        })

        let bbArray = BB.calculate(input)
        let arrayRSI = []
        arrayRSI = RSI.calculate(inputRSI)
        for (let i = 0; i < 13; i++) {
            arrayRSI.unshift(0)
            bbArray.unshift(0)
        }
        let lowerBand = [], upperBand = []
        let topWickLength = []
        let bottomWickLength = []
        let percentageChangeArray = []

        let topWickLengthSum = 0
        let bottomWickLengthSum = 0
        let percentageChangeSum = 0
        let closeSum = 0
        for (let i = 0; i < bbArray.length; i++) {
            topWickLengthSum += Number(Math.abs(Math.max(close[i], open[i]) - high[i])) //possibly could move this too, NEED TO CHECK
            bottomWickLengthSum += Number(Math.abs(Math.min(close[i], open[i]) - low[i]))
            percentageChangeSum += Number(Math.round(((open[i] - close[i]) / open[i]) * 100) / 100)
            closeSum += Number(close[i])
        }

        let closeAverageArray = []
        let bottomWickColor = []
        let bottomVisibility = []
        let topWickColor = []
        let topVisibility = []
        let accelerationArray = []
        let percentageChange5 = []
        let percentageChangeRadius = []
        for (let i = 0; i < bbArray.length; i++) {
            lowerBand.push(bbArray[i].lower)
            upperBand.push(bbArray[i].upper)
            topWickLength.push(Math.abs(Math.max(close[i], open[i]) - high[i]))
            bottomWickLength.push(Math.abs(Math.min(close[i], open[i]) - low[i]))
            percentageChangeArray.push(Math.round(((open[i] - close[i]) / open[i]) * 100) / 100)

            closeAverageArray.push(closeSum / bbArray.length)
            if (
                bbArray[i].lower > low[i] - (low[i] * .02)
                && (Math.abs(Math.min(close[i], open[i]) - low[i]) > (bottomWickLengthSum / bbArray.length))
                && (Math.round(((open[i] - close[i]) / open[i]) * 100) / 100 > (percentageChangeSum / bbArray.length))
                && arrayRSI[i] > 30
            ) {
                bottomVisibility.push(close[i])
                bottomWickColor.push(5)
            } else {
                bottomVisibility.push(null)
                bottomWickColor.push(false)
            }

            if (
                bbArray[i].upper < high[i] + Math.abs(Math.max(close[i], open[i]) - high[i])
                // && (Math.abs(Math.max(close[i], open[i]) - high[i]) > (topWickLengthSum / topWickLength.length))
                && (Math.round(((open[i] - close[i]) / open[i]) * 100) / 100 > (percentageChangeSum / bbArray.length))
                && arrayRSI[i] >= 70) {
                topVisibility.push(close[i])
                topWickColor.push(5)
            } else {
                topVisibility.push(null)
                topWickColor.push(false)
            }

            let j = i - 1
            let k = j - 1
            if (i === 0 || i === 1) {
                accelerationArray.push(null)
            } else if (((Math.abs(close[i] - close[j]) / close[i]) >= .05)
                && ((Math.abs(close[j] - close[k]) / close[j]) >= .05)) {
                accelerationArray.push(close[i])
            } else {
                accelerationArray.push(null)
            }

            if (Math.round(((open[i] - close[i]) / open[i]) * 100) / 100 >= .05) {
                percentageChange5.push(close[i])
                percentageChangeRadius.push(5)
            } else {
                percentageChange5.push(null)
                percentageChangeRadius.push(false)
            }
        }

        let bollingerBandsUpper = {
            visibility: true,
            data: upperBand,
            borderColor: this.colors[3],
            label: 'Upper',
            backgroundColor: this.colors[3],
            pointRadius: null,
            timeFrameIndex: timeFrameIndex
        }

        let bollingerBandsLower = {
            visibility: true,
            data: lowerBand,
            borderColor: this.colors[3],
            label: 'Lower',
            backgroundColor: this.colors[3],
            pointRadius: null,
            timeFrameIndex: timeFrameIndex
        }

        let vwapMap = {
            data: vwap.result,
            backgroundColor: this.colors[7],
            borderColor: this.colors[7],
            pointRadius: 5,
            visibility: true,
            showLine: true,
            label: 'VWAP',
            thickness: 15,
            timeFrameIndex: timeFrameIndex
        }

        let bottomMap = {
            data: bottomVisibility,
            backgroundColor: this.colors[2],
            borderColor: this.colors[2],
            pointRadius: bottomWickColor,
            visibility: bottomWickColor,
            showLine: false,
            label: 'Buy',
            thickness: 100,
            timeFrameIndex: timeFrameIndex
        }

        let topMap = {
            data: topVisibility,
            backgroundColor: this.colors[1],
            borderColor: this.colors[1],
            pointRadius: topWickColor,
            visibility: topWickColor,
            showLine: false,
            label: 'Sell',
            thickness: 100,
            timeFrameIndex: timeFrameIndex
        }

        let closeAverage = {
            data: closeAverageArray,
            backgroundColor: this.colors[5],
            borderColor: this.colors[5],
            pointRadius: true,
            visibility: true,
            showLine: true,
            label: 'Average Close',
            thickness: 100,
            timeFrameIndex: timeFrameIndex
        }

        let percentageChangeMap = {
            data: percentageChange5,
            backgroundColor: this.colors[6],
            borderColor: this.colors[6],
            pointRadius: percentageChangeRadius,
            visibility: percentageChangeRadius,
            showLine: true,
            label: '5% or more',
            thickness: 100,
            timeFrameIndex: timeFrameIndex
        }

        let accelerationMap = {
            data: accelerationArray,
            backgroundColor: this.colors[4],
            borderColor: this.colors[4],
            pointRadius: 5,
            visibility: true,
            showLine: false,
            label: 'Acceleration',
            thickness: 15,
            timeFrameIndex: timeFrameIndex
        }

        let closeLength = close.length

        this.setState({
            datasets: this.state.datasets.concat(newMap, bollingerBandsLower, bollingerBandsUpper, bottomMap, topMap, closeAverage, accelerationMap, percentageChangeMap, vwapMap),
            //.concat(testArray2),
            labels: this.state.labels.concat(startTime),
            visibility: {
                ...this.state.visibility,
                [ticker]: true,
            },
            lengthCount: closeLength
        })
        console.log(this.state.lengthCount, this.state.datasets)
    }

    renderChart(timeFrameIndex) {
        // left, right
        return (
            <div
                style={{ height: '1500px', width: '1500px' }}>
                <Line data={{
                    // labels: this.state.labels.slice(0, this.state.datasets[timeFrameIndex].lengthCount),
                    labels: this.state.labels.slice(0, this.state.lengthCount),
                    //[timeFrameIndex].data,
                    // [timeFrameIndex].data,
                    datasets: this.state.datasets.filter((dataset) => dataset.timeFrameIndex === timeFrameIndex).filter((dataset) => {
                        return dataset.visibility
                    })

                }} options={{
                    responsive: true,
                    title: { text: 'Random scale', dispaly: true },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
                                    beginAtZero: true,
                                    max: 250
                                },
                                gridLines: {
                                    display: false
                                }
                            }
                        ],
                        xAxes: [
                            {
                                gridlines: false,
                                autoSkip: false
                            }
                        ]
                    }
                }} />
            </div >
        )

    }

    /*
    NEED TO DO THIS FOR BUTTON 4HR TO 1YR
    also need to do this for different ticker symbols
    im thinking i need a dictionary/table to identify clearly based on the button
    possibly on click event to slice based on dictionary
    */

    renderButtons() {
        //[dataset.label] this is how you get year
        //this.state.visibility[dataset.label] this is how you visibility
        return this.state.datasets.map((dataset, i) => {
            return (
                <button key={i} onClick={() => {
                    this.setState({
                        visibility: {
                            ...this.state.visibility,
                            [dataset.label]: !this.state.visibility[dataset.label]
                        }
                    })
                }}>
                    {this.state.visibility[dataset.label] ? 'Hide' : 'Show'} {dataset.label}
                </button>
            )
        })
    }

    renderHeader() {
        return (
            <header>
                <h1>Line Chart</h1>
            </header >
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderChart(0)}
                {/* {this.renderChart(1)} */}
                {/* {this.renderChart(18, 27)}
                {this.renderChart(27, 36)}
                {this.renderChart(36, 45)}
                {this.renderChart(45, 54)} */}
                {this.renderButtons()}

                {this.state.text}

            </div >)
    }
}
export default App
