var express = require("express");
var router = express.Router();
var date = require("date-and-time");

const Todos = require('../models/todos');

//LANDING ROUTE
router.get("/", function(req, res){
	res.render("homepage");
});

router.post("/add", function(req, res){
    var tname = req.body.tname;
	var desc = req.body.desc;
	var cname = req.body.cname;
    var duration = req.body.duration;
    var createDate = date.format(new Date(), 'ddd, MMM DD YYYY, HH:mm:ss');
	var newObj = {taskName: tname , taskDesc: desc, creator: cname, duration: duration, createdAt:createDate};
	Todos.create(newObj, function(err,newlycreated){
	if(err){
		console.log(err);
	}
	else{	
		console.log(newlycreated);
		res.redirect("/list");
	}
    });
});

router.get("/list", function(req, res){
	Todos.find({},function(err, todos){
        if(err){
            console.log(err);
        }
        else{
            res.render("listData",{todos:todos});
        }
    });
});

module.exports = router;