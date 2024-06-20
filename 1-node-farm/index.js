const fs = require("fs");
const http = require("http"); // gives us networkig capability
const url = require("url");


//////////////////////////////////////////////////////////////////
//// FILES

// Blocking , synchronous way
// const textIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8')
// console.log(textIn);

// const textOut = `this is waht we know about the avacado: ${textIn}. \n created on ${Date.now()}`
// fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);
// console.log("file has been written");

// nonblocking, asynchronous way

// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1)=>{
//     if(err) return console.log('Error Hui hai');    //character encoding is necessary
//     console.log(data1);
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3)=>{
//            console.log(data3);
//            fs.writeFile('./starter/txt/final.txt',`${data2}\n ${data3}`, 'utf-8', (err)=>{
//             console.log("the file has been written ");
//            })
//         })
//     });
// });

///////////////////////////////////////////////////////////////////
// Server


const replaceTemplate = (temp, product)=>{
  let output =  temp.replace(/{%PRODUCTNAME%}/g,  product.productName);
  output = output.replace(/{%IMAGE%}/g,  product.image);
  output = output.replace(/{%PRICE%}/g,  product.price);
  output = output.replace(/{%FROM%}/g,  product.from);
  output = output.replace(/{%NUTRIENT%}/g,  product.nutrient);
  output = output.replace(/{%QUANTITY%}/g,  product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g,  product.description);
  output = output.replace(/{%ID%}/g,  product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,  'not-organic');
  return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/final/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/final/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/final/templates/template-product.html`, 'utf-8');

const data =  fs.readFileSync(`${__dirname}/final/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
// ./ is for where the script is running and __dirname  is where the current file is located  

const serve = http.createServer((req, res) => {
  console.log(req.url);

  const pathname = req.url;
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {'Content-type':'text/html'});

  const cardsHtml = dataObj.map((el=>replaceTemplate(tempCard, el))).join('')
  const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

  console.log(cardsHtml);

    res.end(output);


    //product page
  } else if (pathname === "/product") {
    res.end("This is the product");

    //API
  } else if(pathname=== '/api'){
    res.writeHead(200, {'Content-type':'application/json'});
    res.end(data);

    //not-found
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(`<h1>This page can not be found </h1>`);
  }
});

// listne to server
const port = 8000;
serve.listen(port, "127.0.0.1", () => {
  console.log("Listning to request on port 8000");
});
