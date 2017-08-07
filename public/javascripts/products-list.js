
 ang.directive('product', function(getJSON_products,$location) {
    return {
			      restrict: 'E',
			      scope: {
				    		basket:"&" //update basken icon in controller;
				   },
				  templateUrl:"javascripts/js_templates/product_template.html",  
			      controller:function ($scope,$rootScope) {

							    getJSON_products.data(function(jsonback) {
							    	 $scope.products = jsonback.data;
							    });

			      }
		  }
  });
