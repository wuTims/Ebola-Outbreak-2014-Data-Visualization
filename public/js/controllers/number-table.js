angular.module('ebolaApp')
	.controller('NumberCtrl', ['$http', function($http) {
		var _this = this;
		this.numbers = [];
		this.sortOrder = '$index';


		$http.get('ebola-months.json')
			.success(function(data){
				console.log(data);
				_this.numbers = data;

				for(var i in _this.numbers){
					console.log(i);
				}
			})
			.error(function(err){
				console.log("Request failed.");
			});

		this.filter = function(data){
			for(var i in data) {
				console.log(i);
			}
		}

		this.order = function(order){
			this.sortOrder = order;
		}

		this.revertAll = function(){
  			this.myFilter = {};
  			this.sortOrder = "$index";
  		}

	}]);