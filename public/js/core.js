'use strict';

/**
* Main app
* Modules for routing and animations
**/
(function(){
	var app = angular.module('ebolaApp', ['ngRoute', 'ngAnimate']);
	app.config(function ($routeProvider) {
		$routeProvider
			.when('/numbers', {
				templateUrl: 'views/number-table.ejs',
				controller: 'NumberCtrl',
				controllerAs: 'numCtrl'
			})
			.when('/visuals', {
				templateUrl: 'views/visualizations.ejs',
				controller: 'VisualsCtrl',
				controllerAs: 'visCtrl'
			})
		});
	
})();

