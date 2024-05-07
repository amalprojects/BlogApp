require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const expressLayout = require("express-ejs-layouts");

const connectDB = require('./servers/routes/config/db');
const app = express();
const port = 3000;
//const methodOverride = require('method-override');

connectDB();

//body/form parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(methodOverride('_method'));

// without the below code , you cant get access to the views ,layouts , partials functionality.
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use("/", require("./servers/routes/main"));
app.use("/", require("./servers/routes/admin"));



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});