 ang.directive('basketCheckout', function(getJSON_products,currency_converter) { //angular will wait for all service to be loaded synchronicly

    return {
			      	restrict: 'E',
				    scope: {
				    	updatebasketicon: "="
				    },
			        templateUrl:"javascripts/js_templates/basket_checkout_template.html",
					controller:function ($scope,$window,$element) {
						var port = $scope;


						//listen for the event from controller
						var listener = $scope.$on('popUp', function (event, args) {
								showLightbox(args);						
						});


						//update currencies from the external service and convert to array for ng-repeat;
						port.currenciesRate = currency_converter.currenciesRate;
						port.defaultCurrency = 1;
						port.updatebasketicon = 0;
						var inital_prices = [];


						var showLightbox = function(param) {

							console.log(param)

							//show lighbox checkout;		      						      			
							port.showLightbox = true;
							port.defaultCurrency = 1;
						    //basket items (the one chosen)
						    port.dir_items = param.lightbox.ctr_items;
						    //attached prices to conveter;
						    for (index in port.dir_items){
						    	 port.dir_items[index].orginalPrice = port.dir_items[index].price;
						    	 inital_prices.push(port.dir_items[index].price);
						    }
						    $scope.updatebasketicon = port.dir_items.length;		
						};


						port.removeItem = function(index) {
								console.log(index);
						        port.dir_items.splice(index, 1);
						        port.updatebasketicon= port.dir_items.length;
						};


						port.showQuantity = function(index) {
							var combined = port.dir_items[index].qty * port.dir_items[index].orginalPrice;

							return combined.toFixed(2);

						}

						port.total = function(index) {
						      var total = 0;
						      angular.forEach(port.dir_items, function(item) {
						          total += item.qty * item.orginalPrice;
						      })

						      return total.toFixed(2);
						  }


						//it convert for the selected one that is why you need index of param.lightbox.dir_items
						port.convertCurrency = function(value){

							for (key in port.dir_items){
									 port.dir_items[key].orginalPrice =inital_prices[key]* value
							}
						     


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