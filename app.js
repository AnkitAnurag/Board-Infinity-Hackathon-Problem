var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Routes
var indexRoutes = require("./routes/index");

//Models
const Todos = require('./models/todos');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


var url = "mongodb+srv://varun2000:varun2000@webdev-sdnkq.mongodb.net/boardInfinity?retryWrites=true&w=majority";

mongoose.connect(url,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

app.use(indexRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("The Board Infinity server has started!!!!");
});