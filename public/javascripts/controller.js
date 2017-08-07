ang.controller('myCTRL',function($scope,$rootScope,currency_converter){
	
		var items_in_basket = 0;
		var items_selected = {}
		var items_session = [];

 		$scope.checkout = function() {
			var sendReferenceData = {};

  				sendReferenceData.id = 1;
  				sendReferenceData.showFromThumbs = true;
  				sendReferenceData.items = items_session;
  				//broadcast event to checkout lighbox
		      	$rootScope.$broadcast('popUp', { lightbox: sendReferenceData });
 		};

 		//$scope.updateBasketIconMain
 		$scope.updateBasketIconMain = 0;
 		$scope.add_item_to_basket_main = function(message) {
 			//collect which itesm have been selected for checkout;
 			items_session.push(message);
 			//$scope.basketItems = items_selected.items.length;
 			$scope.updateBasketIconMain = items_session.length;

 		}

 })