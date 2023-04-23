// importing all the built in modules 
const express = require("express");
const router = require("./Router/route");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;



// importing mongoose connection 
require("./Database/connect");


// using the middleware 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));


// routing on all 
app.use(router);


// listining to the port 
app.listen(port , () => {
    console.log(`Listning to the port : ${port} `);
});
