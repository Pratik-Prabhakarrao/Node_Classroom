const EventEmitter = require("events");
const http = require("http");

class Sale extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sale();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Johns");
});

myEmitter.on("newSale", (stock) => {
  console.log(`there are now ${stock} item left in stock.`);
});

myEmitter.emit("newSale", 9);

//////////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("requsest received");
  console.log(req.url);
  res.end("request received");
});

server.on("request", (req, res) => {
  console.log("Another request ");
});

server.close("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for the request...");
});
