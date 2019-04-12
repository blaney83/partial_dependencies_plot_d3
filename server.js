const express = require("express");
const app = express();
const port = 8000;
const dataJSON = require("./iris.json")

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.Router().get("/data", function(req, res){
    res.send(dataJSON);
}))

app.listen(port, ()=> console.log("App listening on port " + port));
