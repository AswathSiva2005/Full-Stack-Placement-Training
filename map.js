const num = [1,2,3,4,5];
const num2 = num.map(num => num * num);
console.log(num2);

const evenNum = num.filter(num => num%2 === 0);
console.log(evenNum);
