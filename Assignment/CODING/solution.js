const fs = require('fs')
var data=fs.readFileSync("dictionary.txt",'utf8')
let arr = data.split('\n');
// console.log(arr)
var input="examines"
var myArray = input.split("");
let result = []
for(let i=0;i<arr.length;i++){
    let word=arr[i].split("")
    if(word.every(val=>input.includes(val))){
    result.push(arr[i])
    }
}    
console.log(result)
