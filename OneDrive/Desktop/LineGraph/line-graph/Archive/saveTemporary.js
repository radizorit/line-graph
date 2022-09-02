import axios from 'axios'
import React from 'react'
import { Line } from 'react-chartjs-2'
//import { isCompositeComponent } from 'react-dom/test-utils';

//constructor on top, render on bottom, component near top, and function inbetween
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Loading....',
            // labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            labels: [],
            datasets: [],
            // visibility: {} //hash map 
        };
        this.colors = ['red', 'blue', 'yellow', 'green', 'purple']
        this.renderHeader = this.renderHeader.bind(this)
        this.renderChart = this.renderChart.bind(this)
        this.renderChart = this.renderChart.bind(this)
        // this.renderButton = this.renderButton.bind(this)
        //this.toggleData = this.toggleData.bind(this)
    }

    componentDidMount() {
        //1 time initialize,for example load csv file (use fetch)
        //store it into state --> this.setState()
        let left = 0
        let right = left + 1
        setTimeout(() => {
            this.setState({ text: '5 Seconds Passed' })
        }, 5 * 1000) //2 argument first is function
        //5*1000 is 5 seconds
        this.getCSV('/BTC.csv', 0)

        this.getCSV('/ETH.csv', 1)
        while (left < 2) {
            this.renderChart(left, right)
            left++
        }

        //never call this.getCSV again, removing it from the chart you are not deleting data, you are just hiding it
        //figure out how to hide data using your state
    }

    async getCSV(fileName, colorIndex) {
        try {
            let response = await axios({
                method: 'get',
                url: fileName
            })
            this.csvParse(response.data, fileName.slice(1, 4), colorIndex)
        } catch (error) {
            console.log(error)
        }
    }

    csvParse(csvFile, ticker, colorIndex) {
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
        }
        let newMap = {
            startTime: startTime,
            time: time,
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume,
            visibility: true,
            label: ticker,
            data: open,
            borderColor: this.colors[colorIndex]
        }
        this.setState({
            datasets: this.state.datasets.concat(newMap),
            labels: this.state.labels.concat(startTime),
            visibility: {
                ...this.state.visibility,
                [ticker]: true
            }
        })
        console.log(this.state.labels.length)
    }

    renderChart(left, right) {
        return (
            <div
                style={{ height: '1000px', width: '1000px' }}>
                <Line data={{
                    labels: this.state.labels.slice(0, 287),
                    datasets: this.state.datasets.slice(left, right).filter((dataset) => {
                        return dataset.visibility
                    }),
                }} options={{
                    responsive: true,
                    title: { text: 'Random scale', dispaly: true },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
                                    beginAtZero: true
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
        );
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
                {this.renderChart(0, 1)}
                {this.renderChart(1, 2)}
                {this.state.text}

            </div>)
    }
}
export default App
