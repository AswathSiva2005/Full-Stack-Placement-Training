const a = 2;
const b = 3;
console.log(a + b);
console.log()
var c = 5;
console.log("Equal to",c == "5");
console.log()
console.log("Strict Equal to",c === "5");
console.log()



function demo(name){
    console.log("Function : ",name);
    console.log()
}
demo("aswath")



const age = (age) => {
    if(age <= 18){
        console.log("Minor");
        console.log()
    }
    else{
        console.log("Major");
        console.log()
    }
}
age(19)


// Switch

const select = "apple"
switch(select){
    case "apple":
        console.log("🍎");
        break;
    case "banana":
        console.log("🍌");
        break;
    case "mango":
        console.log("🥭");
        break;
    default:
        console.log("Undefined");
}



// Traverse array and object

