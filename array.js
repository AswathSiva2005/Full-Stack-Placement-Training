// array and object

var fruits = ["Apple","Banana","Mango"];
const car = {brand : "Audi", model : "A7", color:"White"};

console.log(fruits[1]);
console.log()
console.log(car.color);
console.log()

for(let i = 0; i <= fruits.length; i++){
    console.log("for loop:",fruits[i]);
    console.log()
}


// New type of value assigning

const num = [1,2,3]
const [a,b,c] = num;
console.log(num);