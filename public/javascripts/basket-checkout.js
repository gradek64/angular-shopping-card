 ang.directive('basketCheckout', function(getJSON,currency_converter) { //angular will wait for all service to be loaded synchronicly

    return {
			      	restrict: 'E',
				    scope: {

				    	flavor: "="
				    },
			        templateUrl:"javascripts/js_templates/portfolio_lightbox_info.html",
					controller:function ($scope,$rootScope,$window,$compile,$element) {
						var port = $scope;



						setTimeout(function() {
							//console.log(currency_converter.convert(2,"PLN"));
						}, 2000);




						
						//listen for the GET request from getJSON service in thumbs directive;
						var listenerJSON = $scope.$on('sendJSON_data', function (event, args) {
								port.JSON_data= args.lightboxJSON.data;
								/*console.log('port.JSON_data');
								console.log(port.JSON_data);*/
								
						});

						// Register and get a handle to the listener
						var listener = $scope.$on('popUp', function (event, args) {
								showLightbox(args);						
						});







							 //update currenceis from the external service and convert to array for ng-repeat;
							 port.currenciesRate = currency_converter.currenciesRate;

									    console.log('port.currenciesRate');
									    console.log(port.currenciesRate);
						

						$scope.flavor = 0;

						var showLightbox = function(param) {

												      						      			

									port.thumb_id = param.lightbox.id;
								 	if(param.lightbox.showFromThumbs){
								 		port.showLightbox = true;
								 		//port.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
								 	}

						

								 	//if(angular.element('iframe')){ angular.element('iframe').remove(); }
							            //param.lightbox.items
							            /*port.description = param.lightbox.items[port.thumb_id].description;
									    port.campaignName = param.lightbox.items[port.thumb_id].campaignName;
									    port.iframe_source = param.lightbox.items[port.thumb_id].iframe_source;
									    port.iframe_ratio = param.lightbox.items[port.thumb_id].iframe_ratio;
									    port.technology = param.lightbox.items[port.thumb_id].technology;
									    port.sector = param.lightbox.items[port.thumb_id].sector;
									    port.price = param.lightbox.items[port.thumb_id].price;
									   */




									    //basket items (the one chosen)
									    port.items = param.lightbox.items;
									    console.log('port.directiveValue');
									    console.log(port.directiveValue);

									    //attached prices to conveter;
									    for (index in port.items){

									    	port.items[index].orginalPrice = port.items[index].price;

									    	console.log('port.items[index].price');
									    	console.log(port.items[index].price);
									    }


									    $scope.flavor = port.items.length;






									    //remove and calculate fiddle link 
									    //https://jsfiddle.net/slav123/75m7e/3/



									    //currency service 
									    //http://www.apilayer.net/api/list?access_key=a8ccc7ed44ccc9de1352e6882f758517&format=1

									    //currency suported;

									    //http://apilayer.net/api/live?access_key=a8ccc7ed44ccc9de1352e6882f758517&currencies=USD,AUD,CAD,PLN,GBP&format=1







						
									          		angular.element(document.getElementById("content")).css('overflow','auto');



									
						};


						port.removeItem = function(index) {
						        port.items.splice(index, 1);
						        port.flavor= port.items.length;
						};

						port.total = function(index) {
						      var total = 0;
						      angular.forEach(port.items, function(item) {

						      		/*console.log('item.qty')
						      		console.log(item.qty)
						      		console.log('item.price')
						      		console.log(item.price)*/


						          total += item.qty * item.price;
						      })

						      return total;
						  }


						//it convert for the selected one that is why you need index of param.lightbox.items
						port.convertCurrency = function(value){

							//convert stirng to array baseed on **
							//var figures = value.split('**');



							//var total = 0;
						      angular.forEach(port.items, function(item,key) {
						      	console.log(value);

						          item.price = item.orginalPrice*value;
						      })

						      //return total;

							//port.items[ 0 ] = figures[0] * figures[1];

						}

						// Unregister custom event
						$scope.$on('$destroy', function () {
						    $log.log("Unregistering listener");
						    listener();
						});

						 $scope.closePopUp = function() {


						 	//remove autoflow;
						 	//angular.element(document.getElementById("content"))[0].classList.toggle('addAutoOverflow');
						 	//angular.element(document.getElementById("content")).removeAttr('style');
						 	angular.element(document.getElementById("content")).css('overflow','visible');


							console.log('close');
							//port.showLightbox = false;
							console.log(port.lightbox);
							
						    port.showLightbox = false;
						};




						 	/***** resisze iframe ***/

							//watch for window resizing for iframe
						        angular.element($window).on('resize', function(){

									if(port.iframe_ratio){
						      			//update on resize
						        		$scope.iframe_width = angular.element('iframe').width();
						        		angular.element('iframe').height($scope.iframe_width/port.iframe_ratio) ;
						        		// is outside of angular
						        		$scope.$digest();
						        	}
						      });

						    /******************/


						   //pagination example;
							 port.setPage= function(page,thumbs) {
						            port.pager = PagerService.GetPager(port.totalPages, page);
						            //passDATA to function; first has to be 0 for array
						            if( !thumbs ) showLightbox({ lightbox: { id:page-1, showFromThumbs:false } });

						            //port.description =' dataReceivedfromThumbs.setLighbox.description';
						            //port.items = port.dummyItems.slice(port.pager.startIndex, port.pager.endIndex + 1);
						        }
						     /******************/


					}
				   
			}

  })