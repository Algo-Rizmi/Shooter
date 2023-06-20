function fibonacci(n) {
  return n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let twoSum = function (nums, target) {
  let storage = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (storage.hasOwnProperty(complement)) {
      return [storage[complement], i];
    }
    storage[nums[i]] = i;
  }
  return [];
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function removeElement(nums, val) {
  let j = 0;
  let i = 0;

  while (i < nums.length) {
    if (nums[i] !== val) {
      nums[j] = nums[j];
      j++;
    }
    i++;
  }
  return j;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function removeElements(nums, val) {
  const arr = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      arr.push(nums[i]);
    }
  }
  return arr;
}

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// console.log(removeElement(nums, val));
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function reversArr(nums) {
  const arr = [];

  for (let i = nums.length; i >= 0; i--) {
    arr.push(nums[i]);
  }
  return arr;
}

console.log(reversArr(nums));

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let isSameTree = function (p, q) {
  if (p === null && q === null) {
    return true;
  }

  if (p === null || q === null) {
    return false;
  }

  if (p.val !== q.val) {
    return false;
  }

  const leftSame = isSameTree(p.left, q.left);
  const rightSame = isSameTree(p.right, q.right);

  return leftSame && rightSame;
};
