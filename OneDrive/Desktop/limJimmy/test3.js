//FRONTEND API/LIBRARY 
//google vision api
//chrome interface with cameras (laptop or phone camera) (built in with chrome --getUserMedia?)

//take photos of something
//detect any text in photos
//send that text as a text message to the subscribers in the communication project
//mobile friendly


/* 
Problem: 
1) pretend you're NSA and you are trying to put into place a filter
2) data pipeline of text going through cell phone to another cell phone
3) trying to be middle man
4) collect and return the specific words and their frequency
5) parent function will use this, make this like a module
6) can be called multiple times
*/

let loremIpsum = 'Lorem is Lorem testing testing testing Ipsum Lorem Ipsum Lorem Ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into elec'
let loremIpsum2 = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
Why do we use it ? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more - or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).
Where does it come from ? Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.Richard McClintock, a Latin professor at Hampden - Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"(The Extremes of Good and Evil) by Cicero, written in 45 BC.This book is a treatise on the theory of ethics, very popular during the Renaissance.The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H.Rackham.
Where can I get some ? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
let loremIpsum3 = 'Small words only, 1 is a number playstation5 Small words only, 1 is a number playstation5 Small words only, 1 is a number hello this is a test hello this is a test'
const ignorableWords = ['to', 'from', 'the', 'should', 'could', 'of', 'is', 'and', 'has', 'a']
class WordCounter {
    constructor(ignorable) {
        this.ignorable = ignorable
        this.collector = {}
    }

    counter(paragraph) {
        let removedNonAlphanumerical = paragraph.replace(/[^a-z0-9 ]/gi, '');

        let splitString = removedNonAlphanumerical.split(' ')
        let filteredString = splitString.filter(word => this.ignorable.indexOf(word) == -1)
        for (let i = 0; i < filteredString.length; i++) {
            let checkingVariable = filteredString[i]

            if (isNaN(checkingVariable)) {
                if (!(checkingVariable in this.collector)) this.collector[checkingVariable] = 0
                this.collector[checkingVariable]++
            }
        }
    }
    returningMap(topX) {
        // let initial = {
        //     Lorem: 18,
        //     Ipsum: 17,
        //     is: 8,
        //     simply: 18,
        //     dummy: 18,
        // }

        // let newInitial = {
        //     '18': ['Lorem','simply','dummy'],
        //     '17': ['Ipsum'],
        //     '8': ['is']
        // }
        let words = Object.keys(this.collector)
        //swap the keys and values
        let freqToWordsCountMap = {}

        //Swapping the key/value pair
        for (let word of words) {
            let stringifiedWord = String(this.collector[word])
            if (!(stringifiedWord in freqToWordsCountMap)) {
                freqToWordsCountMap[stringifiedWord] = [word]
            } else {
                freqToWordsCountMap[stringifiedWord].push(word)
            }
        }

        //Filtering the key/value pair to topX
        let numOfOccurencesKey = Object.keys(freqToWordsCountMap).reverse()
        let filteredMapOfTopX = {}

        for (let numOfOccurencesNumber of numOfOccurencesKey) {
            if (topX > 0) {
                topX -= numOfOccurencesNumber * freqToWordsCountMap[numOfOccurencesNumber].length
                filteredMapOfTopX[numOfOccurencesNumber] = freqToWordsCountMap[numOfOccurencesNumber].length
            }
        }


        return filteredMapOfTopX
        // return freqToWordsCountMap
        //given topX
        //
    }
}

let wordCounter1 = new WordCounter(ignorableWords)
wordCounter1.counter(loremIpsum)
console.log(wordCounter1.returningMap(10), 'first time wordCounter1')
wordCounter1.returningMap(10)

// let wordCounter2 = new WordCounter(ignorableWords)
// wordCounter2.counter(loremIpsum3)
// console.log(wordCounter2.returningMap(5), 'wordCounter2')

// wordCounter1.counter(loremIpsum2)
// console.log(wordCounter1.returningMap(21), 'second time, wordCounter1')
