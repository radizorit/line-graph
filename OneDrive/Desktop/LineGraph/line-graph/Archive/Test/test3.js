//JSON file
//API json
//

let x = [1, 2, 6, 3, 5, 4]
//you want [4,5,3,2,1]
// function reverse(arr) {
//     let newArr = []
//     for (let i = arr.length - 1; i >= 0; i--) {
//         newArr.push(arr[i])
//     }
//     //Reverse 4,3,2,1
//     return newArr
// }

// let reverseOfX = reverse(x)
// console.log(reverseOfX)

function reverse(arr) {
    //In place
    let left = 0
    let right = arr.length - 1
    while (left < right) {
        let tmp = arr[left]
        arr[left] = arr[right]
        arr[right] = tmp
        left++
        right--
    }
    //Step 1 --> have [1,2,3,5,4]
    //Step 2 --> place 4, 5, 3, 2, 1
    //So loop through it reversed
    //

    //Final step --> [4, 5, 3, 2, 1]
}
reverse(x)
console.log(x)



//Actually prove it
//One use case to disprove it

// function sameFunction(arr) {
//     let same = true
//     for (let i = 0; i < arr.length - 1; i++) {
//         if (arr[i] !== arr[i + 1]) {
//             same = false
//         }
//     }
//     console.log(same)
// }

// sameFunction(x)





