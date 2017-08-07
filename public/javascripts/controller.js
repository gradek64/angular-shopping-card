ang.controller('myCTRL',function($scope,$rootScope,currency_converter){
	
		var items_in_basket = 0;
		var items_selected = {}
		var items_session = [];
		var sendReferenceData = {};

 		$scope.checkout = function() {
		

  				sendReferenceData.id = 1;
  				sendReferenceData.showFromThumbs = true;
  				sendReferenceData.ctr_items = items_session;
  				//broadcast event to checkout lighbox when basket is not empty;
  				if($scope.updateBasketIconMain != 0){
		      		$scope.$broadcast('popUp', { lightbox: sendReferenceData });
  				}
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