const download = require('image-downloader');

function downloadImage(url, filepath) {
    return download.image({
        url,
        dest: filepath
    });
}

downloadImage('https://media.istockphoto.com/photos/words-text-from-wooden-blocks-picture-id1088145892?k=20&m=1088145892&s=612x612&w=0&h=f2tVa-zItui7pef57Ts9yGnD9B8IVsODxWH-IWBs6kc=', 'C:/Users/jimmy/OneDrive/Desktop/limJimmy/Image')