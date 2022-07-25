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

const e = require("cors")

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
    return delaySucceed(`Starting to ${url}`, 4000, `Connected to ${url}`)
    // return delayFail(`I am connecting to ${url}`, 4000, `I failed to connect to ${url}`)
    //start server
}

function s3Connect(bucketName) {
    return delaySucceed(`Starting to ${bucketName}`, 3000, `Connected to ${bucketName}`)
    // return delayFail(`I am connecting to ${bucketName}`, 3000, `I failed to connect to ${bucketName}`)
}

function startServer(port) {
    return delaySucceed(`Starting on port ${port}`, 2000, `Connected on port ${port}`)
    // return delayFail(`I am starting on port ${port}`, 2000, `Failed start on port ${port}`)
}

function redisConnect(port) {
    return delaySucceed(`Starting on port ${port}`, 2000, `Connected on port ${port}`)
    // return delayFail(`I am starting on port ${port}`, 2000, `Failed start on port ${port}`)
}

// mongooseConnect('https:www.limJimmy.com')
//     .then((output) => {
//         console.log(output)
//         return s3Connect('s3Connect')
//             .then((output2Different) => {
//                 console.log(output2Different)
//             })
//     })

//ORDER OF PREFERENCE:
//1) mongooseConnect ('https: www.limJimmy.com')
//2) s3Connect ('s3Connect')
//3) redisConnect ('redisConnect')
//4) startServer ('startServer')
// Promise.all([mongooseConnect('https:www.limJimmy.com'), s3Connect('s3Connect'), startServer('startServer'), redisConnect('redisConnect')])
//     .then((output) => {
//         console.log(output)
//     })

// let shouldInitServices = true
// let start = Date.now()
// if (shouldInitServices) {
//     Promise.all([mongooseConnect('https:www.limJimmy.com'), s3Connect('s3Connect'), redisConnect('redise')])
//         .then((output) => {
//             console.log('First 3 promises', output)
//             return startServer('server')
//         })
//         .then((outputAfterServer) => {
//             console.log('outputAfterServer ', outputAfterServer)
//             console.log((Math.floor((Date.now() - start) / 1000)) + ' seconds')
//         })
// } else {
//     return startServer('server')
//         .then((server) => {
//             console.log(server)
//         })
// }

let shouldInitServices = true
let start = Date.now()


//create a promise
//have the argument as shouldInitServices
//if the argument is true then run the promise.all
//if the argument is false then just run the server

//one promise chain

Promise.resolve()
    .then(() => {
        if (shouldInitServices) {
            return Promise.all([mongooseConnect('https:www.limJimmy.com'), s3Connect('s3Connect'), redisConnect('redis')])
        } else {
            return Promise.resolve()
        }
    })
    .then((initResults) => {
        if (initResults) {
            console.log(initResults)
        } else {
            console.log('No initialization')
        }
        return startServer('server')
    })
    .then((serverResults) => {
        console.log(serverResults)
    })
    .catch((e) => {
        console.error(e)
    })

Promise.resolve(shouldInitServices)
    .then((value) => {
        if (value) {
            //promise all to mongoose, s3, and redisConnect
            return Promise.all([mongooseConnect('https:www.limJimmy.com'), s3Connect('s3Connect'), redisConnect('redis')])
                .then((result) => {
                    console.log(result)
                    return startServer('server')
                })
                .then((server) => {
                    console.log(server)
                    console.log((Math.floor((Date.now() - start) / 1000)) + ' seconds')
                })
                .catch((e) => {
                    console.error(e)
                    throw e
                })
        } else if (!value) {
            return startServer('server')
                .then((server) => {
                    console.log(server)
                    console.log((Math.floor((Date.now() - start) / 1000)) + ' seconds')
                })
        }
    })
    .then((results) => {
        console.log(results)
    })
    .catch((e) => {
        console.log(e)
    })