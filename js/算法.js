function bubleSort(arr) {
    var len = arr.length
    for (let outer = len ; outer >= 2; outer--) {
        for(let inner = 0; inner <=outer - 1; inner++) {
            console.log('inner1',arr[inner])
            console.log('inner2',arr[inner + 1])
            if(arr[inner] > arr[inner + 1]) {
                [arr[inner],arr[inner+1]] = [arr[inner+1],arr[inner]]
            }
        }
    }
}
// console.log(bubleSort([4,3,6,1,9,6,2]))
function insertSort(arr) {
for(let i = 1; i < arr.length; i++) { //外循环从1开始，默认arr[0]是有序段
    for(let j = i; j > 0; j--) { //j = i,将arr[j]依次插⼊入有序段中
        console.log('arr1',arr[j])
        console.log('arr2',arr[j-1])
        if(arr[j] < arr[j-1]) {
            [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
        } else {
            break;
        }
    }
}
return arr;
}
// console.log(insertSort([11,4,3,6,1,9,7,2,0]))
function quickSort(arr) {
    console.log('arr',arr)
    if(arr.length <= 1) {
        return arr; //递归出⼝口
    }
    var left = [],
        right = [],
        current = arr.splice(0,1); //注意splice后，数组⻓长度少了了⼀一个

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < current) {
            left.push(arr[i]) //放在左边
        } else {
            right.push(arr[i]) //放在右边
        }
    }
    console.log('current',current)
    console.log('left',left)
    console.log('right',right)
    return quickSort(left).concat(current,quickSort(right)); //递归
}
// console.log(quickSort([11,4,3,6,1,9,7,2,0]))
function quickSort1(arr, low = 0, high = arr.length - 1) {
if(low >= high) return
let left = low
let right = high
let temp = arr[left] //游标
//根据游标区分数组 比游标小的放左边 大的放右边 直到left===right时循环停止
while(left < right) {
    /*
   这个循环的含义就是 从数组右边开始进行比较
  如果当前比的这个数符合要求 那么就把下一个数拿到对面比
    如果不符合要求 就把当前值放到对面
    因为两边条件是相反的 所以循环不会无限
   每次循环 左右各执行比较一次
 */
    if(temp <= arr[right]) {
        right --
    }
    arr[left] = arr[right]
    if( temp >= arr[left]) {
        left ++
    }
    arr[right] = arr[left]
}

arr[left] = temp
//此时left和right就是游标在数组中的索引
//此时数组内部根据游标分成两半 左右两边内部还是乱序的 所以需要递归继续排序
quickSort1(arr, low, left - 1)//左边递归
quickSort1(arr, left + 1, high)//右边递归
return arr
}

function binarySearch(arr, target) {
    var low = 0,
        high = arr.length - 1,
        mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (target === arr[mid]) {
            return `找到了了${target},在第${mid + 1}个`
        }
        if (target > arr[mid]) {
            low = mid + 1;
        } else if (target < arr[mid]) {
            high = mid - 1;
        }
    }
    return -1
}

/*function fib(n){
    let memo = {}
    return helper(memo, n)
}
function helper(memo, n){
    console.log(memo)
    if(n===1 || n===2){
// 前两个
        return 1
    }
// 如果有缓存，直接返回
    if (memo[n]) return memo[n];
// 没缓存
    memo[n] = helper(memo, n - 1) + helper(memo, n - 2)
    return memo[n]
}*/
function fib(n){
    let dp = []
    dp[1] = dp[2] = 1
    for (let i = 3; i <=n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n]
}
// console.log(fib(2))

class Change{
    constructor(changeType){
        this.changeType = changeType
        this.cache = {}
    }
    makeChange (amount) {
        let min = []
        if (!amount) {
            return []
        }
        if (this.cache[amount]) { // 读缓存
            return this.cache[amount]
        }
        for (let i = 0; i < this.changeType.length; i++) {
            const leftAmount = amount - this.changeType[i]
            let newMin
            if (leftAmount >= 0) {
                newMin = this.makeChange(leftAmount) // 这⼀一句句是动态规划的提现
                console.log('newMin',newMin)
            }
            if (leftAmount >= 0 && (newMin.length < min.length - 1 || !min.length)) {
                // 如果存在更更⼩小的找零硬币数, 则执⾏行行后⾯面语句句
                min = [this.changeType[i]].concat(newMin)
            }
        }
        console.log('min',min)
        console.log('cache',this.cache)
        return this.cache[amount] = min
    }
}
const change = new Change([1, 5, 10, 20,50,100])
console.log(change.makeChange(2))
/*
console.log(change.makeChange(5))
console.log(change.makeChange(13))
console.log(change.makeChange(35))
console.log(change.makeChange(135))*/
