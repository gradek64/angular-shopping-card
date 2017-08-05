ang.controller('myCTRL',function($scope,$rootScope,currency_converter){





		var items_in_basket = 0;
		var items_selected = {}
		var items_session = [];


		//load services first;


		/*currency_converter.data().then(
		function(data){
			

			console.log(currency_converter.convert(4.5,"PLN"));
		},
		function(fail){
			console.log(fail)
		})*/






 		$scope.checkout = function() {
			//$scope.showLightbox = true;
			var sendReferenceData = {};
			//compiledeHTML = $compile("<!-- lightbox setup --><lightbox-thumbs></lightbox-thumbs><!-- lightbox setup -->")($scope);
  			//$("body").append(compiledeHTML);

  				sendReferenceData.id = 1;
  				sendReferenceData.showFromThumbs = true;
  				sendReferenceData.items = items_session;

  			
  				//setTimeout(function(){
		      			$rootScope.$broadcast('popUp', { lightbox: sendReferenceData });
  				//},300)
 		};

 		//$scope.updateBasketIconMain


 		$scope.add_item_to_basket_main = function(message) {

 			//collect which itesm have been selected for checkout;

 			items_session.push(message);

 			//$scope.basketItems = items_selected.items.length;
 			$scope.basketItems = items_session.length;

 		}







 })