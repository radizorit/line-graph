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
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
        this.getCSV('/2031.csv', 0)
        this.getCSV('/2032.csv', 1)
        this.getCSV('/2033.csv', 2)
        this.getCSV('/2034.csv', 3)
        this.getCSV('/2035.csv', 4)
        this.renderChart()

        //never call this.getCSV again, removing it from the chart you are not deleting data, you are just hiding it
        //figure out how to hide data using your state
    }

    async getCSV(fileName, colorIndex) {
        try {
            let response = await axios({
                method: 'get',
                url: fileName
            })
            this.csvParse(response.data, fileName.slice(1, 5), colorIndex)
            //update state when resp is done
        } catch (error) {
            console.log(error)
        }
    }

    csvParse(fileData, year, colorIndex) {
        // let rawData = fs.readFileSync(csvFile)
        // let fileData = rawData.toString() //we use .toString() because when it shows buffer, it is raw data, it can be anything
        let rows = fileData.split('\n')
        let amountAxis = []
        for (let i = 0; i < rows.length; i++) {
            amountAxis.push(Number(rows[i].split(',$')[1])) //Update the state
        }
        let newDataset = {
            label: year,
            data: amountAxis,
            fill: false,
            borderColor: this.colors[colorIndex],
            visibility: true
        }
        this.setState({
            datasets: this.state.datasets.concat(newDataset),
            visibility: {
                ...this.state.visibility,
                [year]: true
            }
        })
        //never hold functions for setState
        //whenever you want to append to the array you want to use concat, never use push
        //the rule is you dont want to update the state directly
    }

    renderChart() {
        return (
            <div style={{ height: '750px', width: '1500px' }}>
                <Line data={{
                    labels: this.state.labels,
                    datasets: this.state.datasets.filter((dataset) => {
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
    /*
            return this.state.datasets.map((dataset, i) => {
                return (
                    <button key={i} onClick={() => {
                        this.setState(prevState => ({
                            datasets: prevState.datasets.map(eachItem => {
                                if (eachItem.label === dataset.label) {
                                    return {
                                        ...eachItem,
                                        visibility: !eachItem.visibility
                                    }
                                } else {
                                    return eachItem
                                }
                            })
                        })
                    }}>
                        {dataset.visibility} ? 'Hide' : 'Show' } {dataset.label}
                    </button>
                )
            })
    */
    renderButtons() {
        return this.state.datasets.map((dataset, i) => {
            return (
                <button key={i} onClick={() => {
                    this.setState(prevState => ({
                        datasets: prevState.datasets.map(eachItem => {
                            if (eachItem.label === dataset.label) {
                                return ({ ...eachItem, visibility: !eachItem.visibility })
                            }
                            else return (eachItem)
                        }
                        )
                    }))
                }
                }>
                    {dataset.visibility ? 'Hide' : 'Show'} {dataset.label}

                </button >)
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
                {this.renderChart()}
                {this.renderButtons()}
                {this.state.text}

            </div>)
    }
}
export default App
