
const vision = require('@google-cloud/vision');
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\jimmy\OneDrive\Desktop\limJimmy\serviceAccount.json"
async function cloudVisionary() {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const fileName = './Image/TESTING25.jpg'

    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log(detections)
    // console.log('Text:');
    // detections.forEach(text => console.log(text));
    let detectionText = ''
    for (let i = 1; i < detections.length; i++) {
        if (i === 1) {
            detectionText += detections[i]['description']
        } else {
            detectionText += ' ' + detections[i]['description']
        }
    }
    console.log(detectionText)
}

cloudVisionary()