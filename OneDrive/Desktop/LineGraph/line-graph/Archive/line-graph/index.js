//const mongo = require('./mongo.js')

const DataETH = require('./dataETH')


const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log('Connected to mongodb!')

            const ETH = {
                startTime: '10/2/2021',
                time: '10/2/2021',
                open: 9999,
                high: 9999,
                low: 8888,
                close: 9898,
                volume: 1000
            }

            await new DataETH(ETH).save()
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()