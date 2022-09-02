const fs = require('fs')

//Create random numbers/month pairing
const generator = (year) => {
    let start = Date.now()
    let resultArray = []

    for (let month = 1; month < 13; month++) {
        var value = ('$' + (Math.random() * 495 + 5).toFixed(2))
        let months = (month < 10) ? (year + "-0" + month) : (year + "-" + month)
        resultArray.push((months + ',' + value))
    }
    console.log(resultArray)
    fs.writeFileSync(`${year} File Austin Wanted.csv`, resultArray.join('\n'))
    console.log('Saved! Time to generate: ' + (Date.now() - start));
}

generator(2099)
// const csvRead = (csvFile) => {
//     let rawData = fs.readFileSync(csvFile)
//     let fileData = rawData.toString() //we use .toString() because when it shows buffer, it is raw data, it can be anything
//     let timeAxis = []
//     let amountAxis = []
//     let rows = fileData.split('\n')
//     for (let i = 0; i < rows.length; i++) {
//         timeAxis.push(rows[i].split(',$')[0])
//         amountAxis.push(Number(rows[i].split(',$')[1]))
//     }
//     return { timeAxis, amountAxis }
// }

// console.log(
//     csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\LineGraph\\line-graph\\csvFolder\\2031 File Austin Wanted.csv'),
//     csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\LineGraph\\line-graph\\csvFolder\\2032 File Austin Wanted.csv'),
//     csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\LineGraph\\line-graph\\csvFolder\\2033 File Austin Wanted.csv'),
//     csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\LineGraph\\line-graph\\csvFolder\\2034 File Austin Wanted.csv'),
//     csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\LineGraph\\line-graph\\csvFolder\\2035 File Austin Wanted.csv')
// )
