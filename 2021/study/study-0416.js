/**
 * 两个有序数组A和B，判断B是否是A的子序？要求不可以转化数据格式，不可以使用api
 *
 * 思路： 遍历B数组，再去A数组里找有没有这个值。利用有序这一特点，记录A遍历到哪里，下次从记录点开始即可。
 */

function fn(arr1, arr2) {
  let start = 0;
  let find;
  for (let i = 0; i < arr2.length; i++){
    find = false;
    for (let j = start; j < arr1.length; j++){
      if (arr2[i] === arr1[j]) {
        start = j;
        find = true;
        break;
      }
    }
    if (!find) {
      return false;
    }
  }

  return find;
}

fn([1,2,3,4,5],[2,3,5]);
