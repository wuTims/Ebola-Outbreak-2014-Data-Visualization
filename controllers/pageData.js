exports.loadHome = function(req, res){
	res.render('index');
}

exports.loadNumbers = function(req, res){
	res.render('number-table');
}

exports.loadVisuals = function(req, res){
	res.render('visualizations');
}