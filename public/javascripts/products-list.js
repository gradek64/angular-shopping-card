
 ang.directive('product', function(getJSON_products,$location) {
    return {
			      restrict: 'E',
			      scope: {
				    		basket:"&" //update basken icon in controller;
				   },
				  templateUrl:"javascripts/js_templates/product_template.html",  
			      controller:function ($scope,$rootScope) {

							    getJSON_products.data(function(jsonback) {
							    	 $scope.jsonBack = jsonback;
							    	 $scope.thumbs = jsonback.data;

							    	 //send json to Ligbox so you dont have to request it again 
							    	 $rootScope.$broadcast('sendJSON_data', { lightboxJSON: jsonback });
							    });

			      }
		  }
  });
