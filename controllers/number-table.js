angular.module('ebolaApp')
	.controller('NumberCtrl', ['$http', function($http) {
		var _this = this;
		this.test = "hello";

		$http.get('views/package.json')
			.success(function(data){
				console.log(data);
				console.log("success");
			})
			.error(function(err){
				console.log("Request failed.");
			});

	}]);