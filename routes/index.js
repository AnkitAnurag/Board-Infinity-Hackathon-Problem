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
    //var createDate = date.format(new Date(), 'ddd, MMM DD YYYY, HH:mm:ss');
	var createDate = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

	var datenow=new Date().getHours();

	var hour=new Date().getHours();
	
	var min=new Date().getMinutes();
	
	var ampm=createDate.slice(19,21);


	var fhr,fmin;
	//DURATION CALCULATION
	if(duration>=60){
		var temphr=Math.floor(duration/60);
		var tempmin=duration%60;
		fhr=parseInt(hour)+temphr;
		fmin=parseInt(min)+tempmin;
		if(fmin>=60){
			fmin=fmin%60;
			fhr+=1;
		}
	} else {
		var tempmin=duration%60;
		fmin=parseInt(min)+tempmin;
		fhr=parseInt(hour);
		if(fmin>=60){
			fmin=fmin%60;
			fhr+=1;
		}
	}

	if(fhr>=24){
		fhr=fhr-24;
	}

	console.log("HOUR:",fhr);
	console.log("MINUTE:",fmin);


	var newObj = {taskName: tname , taskDesc: desc, creator: cname, duration: duration, createdAt: createDate };
	Todos.create(newObj, function(err,newlycreated){
	if(err){
		console.log(err);
	}
	else{
		res.redirect("/list");
		var task=cron.schedule(`0 ${fmin} ${fhr} * * *`, () => {
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
							task.stop();
						}
					});
				}
		});
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