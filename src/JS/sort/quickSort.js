function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right
    if (left < right) {
        partitionIndex = partition(arr, left, right)
        quickSort(arr, left, partitionIndex - 1)
        quickSort(arr, partitionIndex + 1, right)
    }
    return arr
}

function partition(arr, left, right) {
    var pivot = left,
        index = pivot + 1
    for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            [arr[index], arr[i]] = [arr[i], arr[index]]
            index++
        }
    }
    if (index != pivot + 1) {
        [arr[index - 1], arr[pivot]] = [arr[pivot], arr[index - 1]]
    }
    return index - 1
}

let arr = []
for (let i = 0; i < 50; i++) {
    arr.push(Math.floor(Math.random()*100))
}

console.log(quickSort(arr))