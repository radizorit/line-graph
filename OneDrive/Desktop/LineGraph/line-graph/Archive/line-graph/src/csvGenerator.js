const fs = require('fs')

//Create random numbers/month pairing
const generator = (year) => {
    let start = Date.now()
    let resultArray = []
    let csvRows = []

    for (let month = 1; month < 13; month++) {
        var value = ('$' + (Math.random() * 495 + 5).toFixed(2))
        let months = (month < 10) ? (year + "-0" + month) : (year + "-" + month)
        resultArray.push((months + ',' + value))
    }

    fs.writeFileSync(`${year} File Austin Wanted.csv`, resultArray.join('\n'))
    console.log('Saved! Time to generate: ' + (Date.now() - start));
}

generator(2034)

const csvRead = (csvFile) => {
    let rawData = fs.readFileSync(csvFile)
    let fileData = rawData.toString() //we use .toString() because when it shows buffer, it is raw data, it can be anything
    let timeAxis = []
    let amountAxis = []
    let rows = fileData.split('\n')
    for (let i = 0; i < rows.length; i++) {
        timeAxis.push(rows[i].split(',$')[0])
        amountAxis.push(Number(rows[i].split(',$')[1]))
    }
    return { timeAxis, amountAxis }
}
/*
console.log(
    csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Austin Projects\\2031 File Austin Wanted.csv'),
    csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Austin Projects\\2032 File Austin Wanted.csv'),
    csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Austin Projects\\2033 File Austin Wanted.csv'),
    csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Austin Projects\\2034 File Austin Wanted.csv'),
    csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Austin Projects\\2035 File Austin Wanted.csv')
)
*/
//console.log(csvRead('C:\\Users\\jimmy\\OneDrive\\Desktop\\Austin Projects\\2035 File Austin Wanted.csv'))

//React app and csv public, react will load csv file ()
//  DO THIS FOR 2015 TO 2020
//label array = year/month
//label array = random amounts
// function readCSV that takes into csv file name --> convert it into 2 arrays

//axios or fetch for client side (to load csv files to react)

/*
React details:
1) Create react app
    a) Single page
    b) START WITH BOILER PLATE
2) 5 buttons representing each year (each csv file/year)
3) Each button will be a toggle
    a) if toggle is on, display into chart.js
*/