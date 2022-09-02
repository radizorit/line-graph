import axios from 'axios'
// const fs = require('fs')

async function getCSV(fileName) {
    try {
        let response = await axios({
            method: 'get',
            url: fileName
        })
        console.log(response.data)
        //update state when resp is done
    } catch (error) {
        console.log(error)
    }
}
getCSV('C:\\Users\\jimmy\\OneDrive\\Desktop\\LineGraph\\line-graph\\public\\2035.csv')
