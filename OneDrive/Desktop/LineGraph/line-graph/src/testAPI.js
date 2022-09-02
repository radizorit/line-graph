import axios from 'axios'

export default async function tryFunction() {
    let openseaData = {}
    let collectionName = []
    try {
        await axios.get('https://api.opensea.io/api/v1/collections?offset=0&limit=200')
            .then((response) => openseaData = response.data['collections'])
    } catch (e) {
        console.log(e)
    }
    console.log(openseaData.length)
    for (let i = 0; i < openseaData.length; i++) {
        collectionName.push(openseaData[i]['name'])
        //find out how to filter out the useless ones
    }
    console.log(collectionName)
}
