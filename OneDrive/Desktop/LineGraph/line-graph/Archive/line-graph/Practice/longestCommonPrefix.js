let strs = ["flower", "flow", "flight"]
var longestCommonPrefix = function (strs) {

    let longestCommonPrefix = ''
    //Given an array, how do I find the prefix?
    if (strs === 'NULL' || strs.length == 0) {
        return longestCommonPrefix
    }
    //Loop through array
    //Loop through the elements

    //Find shortest length of the array so we only need to check the length equivalent to the smallest array
    let minimumLength = strs[0].length

    for (let i = 1; i < strs.length; i++) {
        minimumLength = Math.min(minimumLength, strs[i].length)
    }

    for (let i = 0; i < minimumLength; i++) {
        let current = strs[0][i]
        for (let j = 0; j < strs.length; j++) {
            if (strs[j][i] !== current) {
                return longestCommonPrefix
            }
        }
        longestCommonPrefix += current
    }
    return longestCommonPrefix
};

longestCommonPrefix(strs)