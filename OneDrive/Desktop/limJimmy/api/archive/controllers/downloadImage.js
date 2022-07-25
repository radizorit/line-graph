const download = require('image-downloader');

module.exports = async function downloadImage(url, name) {
    return download.image({
        url,
        dest: `C:/Users/jimmy/OneDrive/Desktop/limJimmy/Image/${name}.jpg`
    });
}
