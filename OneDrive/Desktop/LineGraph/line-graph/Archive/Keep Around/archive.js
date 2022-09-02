let backgroundColor = []

let colorArray = (array) => {
    for (let i = 0; i < array.length; i++) {
        if ((array[i]).substring(0, 4) === '2035') { backgroundColor.push('red') }
        else if (array[i].substring(0, 4) === '2034') { backgroundColor.push('blue') }
        else if (array[i].substring(0, 4) === '2033') { backgroundColor.push('green') }
        else if (array[i].substring(0, 4) === '2032') { backgroundColor.push('yellow') }
        else if (array[i].substring(0, 4) === '2031') { backgroundColor.push('purple') }
    }
}
colorArray(timeAxis)


// nullImplement() {
//     //let shallowArray = []
//     let shallowArray = amountAxis.slice()
//     for (let i = 0; i < shallowArray.length; i++) {
//         if (i >= frontArray && i <= endArray) {
//             shallowArray[i] = shallowArray[i]
//         } else { shallowArray[i] = 'NULL' }
//     }
//     frontArray += 12
//     endArray += 12
//     masterArray.push(shallowArray)
// }
