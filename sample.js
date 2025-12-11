let name = "Harikarthik";
const age = 21;
var country = "India";

console.log(5==="5");


function greet(name){
    console.log("Name: "+name)
}

greet("Harikarthik")


// basic functions
function min(num){
    if(num<18){
    console.log("Minor");
    }
    else{
    console.log("Adult");

}

}
min(20)

console.log(x)
var x=5

// switch case
var ac ="India"
var ac ="def"
console.log(ac)

let fruit ="apple"

switch(fruit){

case "apple":
    console.log("Apple 🍎");
    break;
case "banana":
    console.log("Banana");
    break;
default:
    console.log("umbu")

}




//ternary operator
let no =16

result = no>18 ? console.log("Adult") : console.log("Minor")


let fruits = ["apple", "banana", "mango"];
console.log(fruits[0]);



//arrow function

let func = (name)=>{
    return `hello + ${name}`

    console.log(func("Harikarthik"))
}


// ... operator (spread operator)

const number = [1,2,3]
const morenum = [4,5,6]
const allnum = [...number,...morenum]
console.log(allnum) 


//object


const person ={
    name:"HARIKARTHIK 💕 Anbu",
    age:21,
    dept:"IT"
}

const update = {...person,city:"perundurai"};
console.log(update)


const nu = [1,2,3];
const [a,b,c] =nu;
console.log(a,b,c)


//mapandfilter


const num = [1,2,3,4,5]
console.log(num.map(num=>num*num))
console.log(num.filter(num=>num%2==0))


//string operation


let str2 = "HELLO"
console.log(str2.concat(",",str2,"!"))
console.log(str2.includes("World")) //true or false


console.log(str2.indexOf("World"))
console.log(str2.substring(0,5))