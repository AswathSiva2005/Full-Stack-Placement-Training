const person = {
    name : "Aswath",
    age : "21",
    college : "KEC"
}


console.log(person.name);
console.log();

for(let key in person){
    console.log(key + " : " + person[key]);
    console.log();
}