 ang.directive('basketCheckout', function(getJSON_products,currency_converter) { //angular will wait for all service to be loaded synchronicly

    return {
			      	restrict: 'E',
				    scope: {
				    	updatebasketicon: "="
				    },
			        templateUrl:"javascripts/js_templates/basket_checkout_template.html",
					controller:function ($scope,$rootScope,$window,$element) {
						var port = $scope;


						// Register and get a handle to the listener
						var listener = $scope.$on('popUp', function (event, args) {
								showLightbox(args);						
						});



						//update currencies from the external service and convert to array for ng-repeat;
						port.currenciesRate = currency_converter.currenciesRate;
						$scope.updatebasketicon = 0;

						var showLightbox = function(param) {

							//show lighbox checkout;		      						      			
							port.showLightbox = true;
						    //basket items (the one chosen)
						    port.items = param.lightbox.items;
						    //attached prices to conveter;
						    for (index in port.items){
						    	port.items[index].orginalPrice = port.items[index].price;
						    }
						    $scope.updatebasketicon = port.items.length;		
						};


						port.removeItem = function(index) {
						        port.items.splice(index, 1);
						        port.updatebasketicon= port.items.length;
						};

						port.total = function(index) {
						      var total = 0;
						      angular.forEach(port.items, function(item) {
						          total += item.qty * item.price;
						      })

						      return total.toFixed(2);
						  }


						//it convert for the selected one that is why you need index of param.lightbox.items
						port.convertCurrency = function(value){
						      angular.forEach(port.items, function(item,key) {
						          item.price = item.orginalPrice*value;
						      })
						}

						// Unregister custom event
						$scope.$on('$destroy', function () {
						    $log.log("Unregistering listener");
						    listener();
						});

						 $scope.closePopUp = function() {
						 	angular.element(document.getElementById("content")).css('overflow','visible');
						    port.showLightbox = false;
						};
					}   
			}

  })