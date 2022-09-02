import { timeAxis, amountAxis } from '../src/App.js';
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

let backgroundColor = []

let colorArray = (array) => {
    for (let i = 0; i < array.length; i++) {
        if ((array[i]).substring(0, 4) === '2035') { backgroundColor.push('red') }
        else if (array[i].substring(0, 4) === '2034') { backgroundColor.push('blue') }
        else if (array[i].substring(0, 4) === '2033') { backgroundColor.push('green') }
        else if (array[i].substring(0, 4) === '2032') { backgroundColor.push('yellow') }
        else if (array[i].substring(0, 4) === '2031') { backgroundColor.push('purple') }
    }
}
colorArray(timeAxis)
//need to figure out why it works sometimes, it is a timing issue?
let LineChart = () => {
    const [chartData, setChartData] = useState({})
    const chart = () => {
        setChartData({
            labels: timeAxis, //probably need to reformat the data to be months and years (like austin said on fb)
            datasets:
                [
                    {
                        label: 'My First Dataset',
                        data: amountAxis,
                        fill: false,
                        //borderColor: 'blue',
                        borderColor: backgroundColor,
                        // backgroundColor: backgroundColor,
                        //tension: .1
                    }
                ]
        })
    }
    useEffect(() => {
        chart()
    }, [])
    return (
        <div className="App">
            <div style={{ height: '1000px', width: '1000px' }}>
                <Line data={chartData} options={{
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
                                gridlines: false
                            }
                        ]
                    }
                }} />
            </div>
        </div>
    )
}
console.log(timeAxis, amountAxis, backgroundColor)
export default LineChart


