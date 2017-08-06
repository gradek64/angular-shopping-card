 ang.service('getJSON',function($http){

 	this.data = function(callback) {
 		
 		$http.get("./data/portfolio.json").then( function (response) { 

				//connect them to VAR 
				var dataToSentLigthbox = {};
				dataToSentLigthbox.data = [];
				var responseArrayData = response.data.portfolio.campaign;
				angular.forEach(responseArrayData,function(item,index){

					dataToSentLigthbox.data[index] = {};
					dataToSentLigthbox.data[index].id = index;
					//by default you want 1 quatinty of product (not in JSON for clarity);
					dataToSentLigthbox.data[index].qty = 1;
					dataToSentLigthbox.data[index].description = item.description;
					dataToSentLigthbox.data[index].thumbnail = item.thumbnail;
					dataToSentLigthbox.data[index].campaignName = item.name;
					dataToSentLigthbox.data[index].iframe_source = item.iframe_source;
					dataToSentLigthbox.data[index].iframe_ratio = item.iframe_ratio;
					dataToSentLigthbox.data[index].technology = item.technology;
					dataToSentLigthbox.data[index].price = item.price;
					dataToSentLigthbox.data[index].sector = item.sector;

					if(index==responseArrayData.length-1){
						//get callback with array;
						callback(dataToSentLigthbox);
					}
				});

		});

 		
 	};
 	   
 })
  .directive('thumbs', function(getJSON,$location) {
    return {
			      restrict: 'E',
			      scope: {

				    		basket:"&"


				   },
				  templateUrl:"javascripts/js_templates/thumbs_template.html",  
			      controller:function ($scope,$rootScope,$compile) {


				    console.log('json');
				    getJSON.data(function(jsonback) {
				    	 $scope.jsonBack = jsonback;
				    	 $scope.thumbs = jsonback.data;

				    					    	 //send json to Ligbox so you dont have to request it again 
				    	 $rootScope.$broadcast('sendJSON_data', { lightboxJSON: jsonback });
				    });

			      	var compiledeHTML;
			      	var dataPassedToLighbox = {};
			      	var active;


			      	      	$scope.changeClass = function(thumb_id,event) {


			      	        				
			      	        				//$scope.showLightbox = true;
			      	        				var sendReferenceData = {};
			      	        				//compiledeHTML = $compile("<!-- lightbox setup --><lightbox-thumbs></lightbox-thumbs><!-- lightbox setup -->")($scope);
			      			      			//$("body").append(compiledeHTML);

			      			      				sendReferenceData.id = thumb_id;
			      			      				sendReferenceData.showFromThumbs = true;

			      			      			
			      			      				//setTimeout(function(){
			      						      			$rootScope.$broadcast('popUp', { lightbox: sendReferenceData });
			      			      				//},300)

			      	        }
					
			      }
		  }
  });
