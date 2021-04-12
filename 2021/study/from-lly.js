// 输入：[['a', 'b'], ['n', 'm'], ['0', '1']]
// 输出：["an0", "an1", "am0", "am1", "bn0", "bn1", "bm0", "bm1"]
function test(arr) {
    let res = [];

    let arrL = arr.length;
    for (let i = 0; i < arrL; i++){
        if (i === 0) {
            res.push(...arr[0]);
        }
        else {
            let currentArr = arr[i];
            let newRes = [];
            res.map(resItem => {
                currentArr.map(arrItem => {
                    newRes.push(resItem + arrItem);
                });
            });
            res = newRes;
        }
    }

    console.log(res);

    return res;
}
test([['a', 'b'], ['n', 'm'], ['0', '1']]);
