var express = require("express");
var router = express.Router();
var date = require("date-and-time");
var cron = require('node-cron');

const Todos = require('../models/todos');

//LANDING ROUTE
router.get("/", function(req, res){
	res.render("homepage");
});

//ADD TODO ROUTE
router.post("/add", function(req, res){
    var tname = req.body.tname;
	var desc = req.body.desc;
	var cname = req.body.cname;
    var duration = req.body.duration;
    var createDate = date.format(new Date(), 'ddd, MMM DD YYYY, HH:mm:ss');
	var newObj = {taskName: tname , taskDesc: desc, creator: cname, duration: duration, createdAt: createDate };
	Todos.create(newObj, function(err,newlycreated){
	if(err){
		console.log(err);
	}
	else{
		res.redirect("/list");
		var task=cron.schedule(`0 */${duration} * * * *`, () => {
			Todos.findOne({_id: newlycreated._id},function(err, todos){
				if(err){
					console.log(err);
				}
				else{
					console.log(newlycreated);
					Todos.findOneAndRemove({_id: newlycreated._id}, function(err){
						if(err) {
							console.log(err);
						} else {
							console.log("Deleted Successfully!");
							var date=Date.now();
							console.log(date);
						}
					});
				}
		});
		task.stop();
		res.redirect("/list");
	});
    }
});
});

//SHOW TODO ROUTE
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