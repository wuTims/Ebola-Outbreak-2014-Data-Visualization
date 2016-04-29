/**
* Controller for number table at '/numbers'
* Uses angular's $http module to use Ajax to get json data
*
**/

angular.module('ebolaApp')
	.controller('NumberCtrl', ['$http', function($http) {
		var _this = this;
		this.numbers = [];
		this.sortOrder = '$index';

		//retrieves json data and stores in array
		$http.get('ebola-months.json')
			.success(function(data){
				console.log(data);
				_this.numbers = data;

			})
			.error(function(err){
				console.log("Request failed.");
			});


		//Function to change sort order of data
		this.order = function(order){
			this.sortOrder = order;
		}

		//Changes to original order of data
		this.revertAll = function(){
  			this.myFilter = {};
  			this.sortOrder = "$index";
  		}

	}]);