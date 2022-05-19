function solve(sprintsArr) {
  if (sprintsArr.length < 3) {
    console.log("error");
    return;
  }
  const obj = {
    sequence: [],
    sum: -Infinity,
  };
  for (let i = 0; i < sprintsArr.length; i++) {
    let curentSSequence = sprintsArr.slice(i, i + 3);
    let curentSum = curentSSequence.reduce((acc, num) => acc + num, 0);
    let isShorter = curentSSequence.length < 3;
    if (isShorter) break;
    if (curentSum >= obj.sum) {
      obj.sum = curentSum;
      obj.sequence = curentSSequence;
    }
  }
  return obj;
}

solve([11, 14, 10, 12, 15]);
solve([76, 80]);
solve([12, 9, 1, 5, 11, 5]);
solve([76, 80, 81, 77, 83, 78, 80]);
