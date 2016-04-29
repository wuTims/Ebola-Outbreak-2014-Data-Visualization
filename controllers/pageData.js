//All export methods just to render ejs pages and handle GET requests

exports.loadHome = function(req, res){
	res.render('index');
}

exports.loadNumbers = function(req, res){
	res.render('number-table');
}

exports.loadVisuals = function(req, res){
	res.render('visualizations');
}