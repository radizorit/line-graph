// const { default: mongoose } = require("mongoose")


function delaySucceed(simulationString, ms, returnValue) {
    //resolve is the function you execute when successful
    //reject is the function you execute when it failed
    return new Promise((resolve, reject) => {
        // let timeoutID = setTimeout(() => {
        setTimeout(() => {
            console.log(simulationString)
            // return returnValue
            resolve(returnValue)
        }, ms)//connect before starting server
        //how to cancel timeouts
        // clearTimeout(timeoutID)
    })
}

//generic simulators
//

function delayFail(simulationString, ms, returnErrorMsg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(simulationString)
            // return returnErrorMsg
            reject(returnErrorMsg)
        }, ms)
    })
}


function mongooseConnect(url) {
    //successful connection or simulated fail
    return delaySucceed(`I am connecting to ${url}`, 4000, `I connected to ${url}`)
    // return delayFail(`I am connecting to ${url}`, 4000, `I failed to connect to ${url}`)
    //start server
}

function s3Connect(bucketName) {
    return delaySucceed(`I am connecting to ${bucketName}`, 3000, `I connected to ${bucketName}`)
    // return delayFail(`I am connecting to ${bucketName}`, 3000, `I failed to connect to ${bucketName}`)
}

function startServer(port) {
    return delaySucceed(`Starting on port ${port}`, 2000, `Started on port ${port}`)
    // return delayFail(`I am starting on port ${port}`, 2000, `Failed start on port ${port}`)
}

function redisConnect(port) {
    return delaySucceed(`Starting on port ${port}`, 2000, `Started on port ${port}`)
    // return delayFail(`I am starting on port ${port}`, 2000, `Failed start on port ${port}`)
}

//connect to mongoose

//connect mongoose
//connect s3
//then start server

//add redisConnect
//STUDY/LOOK UP Promise.all

//IMPLEMENT THIS:
//1) start server after mongoose, s3, redis have all been initialized
//2) all 3 should initialize CONCURRENTLY
//3) So if moongoose, s3, redis have similated delays of 4, 3, 5,
//The whole init should take about 5
//Not 4+3+5=12
//4) And upon initialization completion, i want their outputs combined and console logged like
// {
//     redisResult: …
//     s3Result: …
//     mResult: …
//     }

// mongooseConnect('https:www.limjimmy.com')
//     .then((output) => {
//         console.log(output)
//         return s3Connect('jimmyBuckets')
//     })
//     .then((output2) => {
//         console.log(output2)
//         return startServer('5000')
//     }).then((output3) => {
//         console.log(output3)
//         // return 'done'
//     })
//     .catch((e) => {
//         console.error(e)
//     })
let promiseFunctionArray = [mongooseConnect('https:www.limJimmy.com'), s3Connect('jimmyBuckets'), startServer('5000')]

// Promise.all(promiseFunctionArray)
//     .then((values) => {
//         console.log(values)
//     })
//then apply s3 function
//then start your server

//connect to mongoose before starting server

//how i currently am connecting to mongodb
// mongooseConnect('https:www.limjimmy.com')
//     .then((output) => {
//         console.log(output)
//     })
//     .catch((e) => {
//         console.error(e)
//     })

// startServer('5000')
//     .then((output) => {
//         console.log(output)
//     }).catch((e) => {
//         console.error(e)
//     })

// s3Connect('jimmyBuckets')
//     .then((output) => {
//         console.log(output)
//     })
//     .catch((e) => {
//         console.error(e)
//     })

//visualization for git
    //2 areas of code -- computer(local) and github (remote)
    //keep them synchronosed
        //when u make changes locally, you want to push that to remote
            //after pushing they are back in sync
        //when you make changes remotely, like github.com
            //you want to pull to the local
                //to be back in sync

    //another level of distinction: different branches
        //when you are working by yourself --master branch and dev branch
            //production and dev

        //team:
            //jimmy branch
            //austin branch
                //multiple branches for multiple features