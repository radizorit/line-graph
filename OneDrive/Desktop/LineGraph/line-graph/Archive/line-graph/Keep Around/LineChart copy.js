/*
1) Fix the timing issue (need to resave to see data)
2) Add buttons that toggle data
3) Clean up code
*/


import { timeAxis, amountAxis } from '../src/App.js';
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

let masterArray = []
let frontArray = 0
let endArray = 11

let multipleArray = () => { //produces multiple arrays (5) for nullImplement(number) to loop through and NULL based on index to later input data
    let numberOfCopies = (amountAxis.length) / 12 //assumed we are doing 12 months
    for (var i = numberOfCopies; i > 0; i--) {
        // nullImplement()

        //I know austin said be careful with nested loops, but i think this is fine because it is max copies of 5 (using numberOfCopies)
    }
}

// let nullImplement = () => {
//     let shallowArray = amountAxis.slice()
//     for (let i = 0; i < shallowArray.length; i++) {
//         if (i >= frontArray && i <= endArray) {
//             shallowArray[i] = shallowArray[i]
//         } else { shallowArray[i] = 'NULL' }
//     }
//     frontArray += 12
//     endArray += 12
//     masterArray.push(shallowArray)
// }
['NULL',]
multipleArray()
let LineChart = () => {
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: timeAxis,
            datasets:
                [
                    {
                        label: 'My First Dataset ',
                        data: masterArray[0],
                        fill: false,
                        borderColor: 'red',
                    },
                    {
                        label: 'My Second Dataset',
                        data: masterArray[1],
                        fill: false,
                        borderColor: 'blue',
                    },
                    {
                        label: 'My Third Dataset',
                        data: masterArray[2],
                        fill: false,
                        borderColor: 'yellow',
                    },
                    {
                        label: 'My Fourth Dataset',
                        data: masterArray[3],
                        fill: false,
                        borderColor: 'pink',
                    },
                    {
                        label: 'My Fifth Dataset ',
                        data: masterArray[4],
                        fill: false,
                        borderColor: 'purple',
                    }
                ]
        })
    }
    useEffect(() => {
        chart()
    }, [])
    return (
        <div className="App">
            <div style={{ height: '1000px', width: '1500px' }}>
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
                                gridlines: false,
                                autoSkip: false
                            }
                        ]
                    }
                }} />
            </div>
        </div>
    )
}
//console.log(`timeAxis:${timeAxis},amountAxis: ${amountAxis}, masterArray: ${masterArray}`)
export default LineChart


