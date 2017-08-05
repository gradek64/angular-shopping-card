 ang.directive('basketCheckout', function(getJSON,currency_converter) {

    return {
			      	restrict: 'E',
				    scope: {

				    	updateBasketIcon:"@" //one way only 
				    },
			        templateUrl:"javascripts/js_templates/portfolio_lightbox_info.html",
					controller:function ($scope,$rootScope,$window,$compile,$element) {
						var port = $scope;



						setTimeout(function() {
							console.log(currency_converter.convert(2,"PLN"));
						}, 2000);





						
						//listen for the GET request from getJSON service in thumbs directive;
						var listenerJSON = $scope.$on('sendJSON_data', function (event, args) {
								port.JSON_data= args.lightboxJSON.data;
								console.log('port.JSON_data');
								console.log(port.JSON_data);
								
						});

						// Register and get a handle to the listener
						var listener = $scope.$on('popUp', function (event, args) {
								showLightbox(args);						
						});


						




						



						var showLightbox = function(param) {

												      						      			

									port.thumb_id = param.lightbox.id;
								 	if(param.lightbox.showFromThumbs){
								 		port.showLightbox = true;
								 		//port.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
								 	}



								 	//if(angular.element('iframe')){ angular.element('iframe').remove(); }
							            
							            port.description = $scope.JSON_data[port.thumb_id].description;
									    port.campaignName = $scope.JSON_data[port.thumb_id].campaignName;
									    port.iframe_source = $scope.JSON_data[port.thumb_id].iframe_source;
									    port.iframe_ratio = $scope.JSON_data[port.thumb_id].iframe_ratio;
									    port.technology = $scope.JSON_data[port.thumb_id].technology;
									    port.sector = $scope.JSON_data[port.thumb_id].sector;
									    //basket itesm 
									    port.items = param.lightbox.items;


									    console.log('params from controller');
									    console.log(param);


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
						        port.updateBasketIcon = port.items.length;
						};

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