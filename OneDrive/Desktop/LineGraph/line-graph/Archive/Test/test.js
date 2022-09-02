//BUBBLE

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
            let tmp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = tmp
        }
    }
}

//SELECTION

for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
            min = j
        }
    }

    if (min != i) {
        let tmp = arr[i]
        arr[i] = arr[min]
        arr[min] = tmp
    }
}

//BINARY SEARCH

for (let i = 0; i < arr.length; i++) {
    let start = 0,
        end = arr.length - 1
    while (start < end) {
        let mid = Math.floor((start + end) / 2)

        if (arr[mid] === x) {
            return true
        } else if (arr[mid] < x) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return false
}