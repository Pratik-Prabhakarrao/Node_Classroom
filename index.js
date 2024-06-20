const fs = require('fs');
const http = require('http'); // gives us networkig capability


// Blocking , synchronous way 
const textIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8')
console.log(textIn);

const textOut = `this is waht we know about the avacado: ${textIn}. \n created on ${Date.now()}`
fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);
console.log("file has been written");


// nonblocking, asynchronous way

fs.readFile('./1-node-farm/starter/txt/start.txt', 'utf-8', (err, data1)=>{
    if(err) return console.log('Error Hui hai');    //character encoding is necessary
    console.log(data1);
    fs.readFile(`./1-node-farm/starter/txt/${data1}.txt`, 'utf-8', (err, data2)=>{
        console.log(data2);
        fs.readFile('./1-node-farm/starter/txt/append.txt', 'utf-8', (err, data3)=>{
           console.log(data3); 
           fs.writeFile('./1-node-farm/starter/txt/final.txt',`${data2}\n ${data3}`, 'utf-8', (err)=>{
            console.log("the file has been written ");
           })
        })
    });
});
