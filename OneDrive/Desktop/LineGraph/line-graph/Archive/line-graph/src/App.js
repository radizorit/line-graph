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
        // this.renderButton = this.renderButton.bind(this)
        //this.toggleData = this.toggleData.bind(this)
    }

    componentDidMount() {
        //1 time initialize,for example load csv file (use fetch)
        //store it into state --> this.setState()
        setTimeout(() => {
            this.setState({ text: '5 Seconds Passed' })
        }, 5 * 1000) //2 argument first is function
        //5*1000 is 5 seconds
        this.getCSV('/dataETH.csv')
        this.renderChart()

        //never call this.getCSV again, removing it from the chart you are not deleting data, you are just hiding it
        //figure out how to hide data using your state
    }

    async getCSV(fileName) {
        try {
            let response = await axios({
                method: 'get',
                url: fileName
            })
            this.csvParse(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    csvParse(csvFile) {
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
            // if (index == 0) {
            //     dataField.push(rows[i].split(',')[index].slice(0, 10))
            // } else if (index != 1) {
            //     dataField.push(Number(rows[i].split(',')[index]))
            // } else {
            //     dataField.push(rows[i].split(',')[index])
            // }
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
            data: open
        }
        this.setState({
            datasets: this.state.datasets.concat(newMap),
            labels: this.state.labels.concat(startTime),
            visibility: {
                ...this.state.visibility,
                visibility: true
            }
        })

        console.log(this.state)
    }

    renderChart() {
        return (
            <div style={{ height: '750px', width: '1500px' }}>
                <Line data={{
                    labels: this.state.labels,
                    datasets: [{
                        label: 'My First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: 'red'
                    }]
                    // this.state.datasets.filter((dataset) => {
                    //     return dataset.visibility
                    // }),
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
            </div >)
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
                {this.renderChart()}
                {this.state.text}

            </div>)
    }
}
export default App
