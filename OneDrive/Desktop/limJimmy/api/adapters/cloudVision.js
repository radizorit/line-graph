const axios = require('axios');
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\jimmy\OneDrive\Desktop\limJimmy\serviceAccount.json"

module.exports = async function cloudVision(base64) {
    const url = `https://vision.googleapis.com/v1/images:annotate` + `?key=${process.env.gkey}`;

    try {
        const results = await axios
            .post(url, {
                requests: [{
                    image: {
                        content: base64.slice(23)
                    },
                    features: [{
                        type: 'DOCUMENT_TEXT_DETECTION'
                    }]
                }]
            });
        // console.log('results', results.data.responses[0].fullTextAnnotation.text, 'results')
        let detections = results.data.responses[0].fullTextAnnotation.text.split('\n').join(' ')
        return detections
    } catch (e) {
        console.log(JSON.stringify(e.response.data.error.details, null, 2), 'unable to make the google api request')
    }
}
