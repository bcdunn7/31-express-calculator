const { ExpressError } = require("./errors");

function mean(nums) {
    let numsArr = nums.split(',');

    let numsArrParse = numsArr.map(function(num) {
        return parseInt(num);
    });

    let numsArrInt = validateNums(numsArrParse);

    if (numsArrInt instanceof Error) {
        return numsArrInt
    }

    let sum = 0;
    let count = 0;
    for (n of numsArrInt) {
        sum += n;
        count++;
    }
    let avg = sum/count;
    return avg.toFixed(2);
}

function median(nums) {
    let numsArr = nums.split(',');
    let numsArrParse = numsArr.map(function(num) {
        return parseInt(num);
    });

    let numsArrInt = validateNums(numsArrParse);

    if (numsArrInt instanceof Error) {
        return numsArrInt
    }

    let sortedArr = numsArrInt.sort((a,b) => a-b);
    if (sortedArr.length % 2 === 0) {
        let mid = sortedArr.length/2;
        let med = (sortedArr[mid]+sortedArr[mid-1])/2;
        console.log(med);
        return med;
    }
    else {
        let med = sortedArr[(sortedArr.length/2)-0.5];
        return med;
    }
}

function mode(nums) {
    let numsArr = nums.split(',');
    let numsArrParse = numsArr.map(function(num) {
        return parseInt(num);
    });

    let numsArrInt = validateNums(numsArrParse);

    if (numsArrInt instanceof Error) {
        return numsArrInt
    }

    // find count of each num
    let tracker = new Map;
    for (num of numsArrInt) {
        if (tracker.has(num)) {
            tracker.set(num,(tracker.get(num))+1) 
        } else {
            tracker.set(num,1);
        };
    };

    //find mode
    let highest = 0;
    let mode;
    for (let [k,v] of tracker) {
        if (v >= highest) {
            highest = v;
            mode = k;
        }
    }
    return mode;
}

function validateNums(nums) {
    for (num of nums) {
        if (typeof num !== 'number'){
            return new Error("'nums' can only accept numbers")
        }
        else if (isNaN(num)) {
            return new Error("'nums' can only accept numbers;")
        }
    }
    return nums;
}

module.exports = {
    mean: mean,
    median: median,
    mode:mode
}