//const fs = require('fs')

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
    console.log(resultArray)
    // fs.writeFileSync(`${year} File Austin Wanted.csv`, resultArray.join('\n'))
    // console.log('Saved! Time to generate: ' + (Date.now() - start));
}

generator(2020)