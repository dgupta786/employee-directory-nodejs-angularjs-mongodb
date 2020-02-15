require("dotenv").config()
const express = require("express")
const app = express()
const fs = require("fs")
var morgan = require('morgan')
const path = require('path')
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoDb = require("./db")
const routers = require("./route")
const port = process.env.PORT || 8000

let options = {
    origin: "*"
};

app.use(cors(options));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));

app.use(express.static(__dirname + '/public'));

//Access Logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/employees', routers.employees)

app.get('/getEmployee/:id', routers.getEmployee)

app.post('/addEmployee', routers.addEmployee)

app.get('/deleteEmployee/:id', routers.deleteEmployee)

app.post('/updateEmployee/:id', routers.updateEmployee)




app.listen(port, () => {
    console.log(`Employee Directory application is running on http://localhost:${port}`)
})
