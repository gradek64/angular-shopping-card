ang.service('basketService', function() {


    	console.log(this);
        /** @returns {String} HTML representation of the Cards in the Hand. */
        this.toHtml = function (){
            console.log('this.toHtml');

            //apend to id 
           var container =  angular.element(document.getElementById("basket-icon"));
           container.append("<p>check me out</p><span id='numberof_items'></span>");

           //add event listener for checkout;
           container.on( "click", this.checkOut);
          
            return  container;
      };




        this.checkOut = function(){
            console.log("checkOut");

                    				//$scope.showLightbox = true;
                    				var sendReferenceData = {};
                    				//compiledeHTML = $compile("<!-- lightbox setup --><lightbox-thumbs></lightbox-thumbs><!-- lightbox setup -->")($scope);
            		      			//$("body").append(compiledeHTML);

            		      				sendReferenceData.id = 1;
            		      				sendReferenceData.showFromThumbs = true;

            		      			
            		      				//setTimeout(function(){
            					      			//$rootScope.$broadcast('popUp', { lightbox: sendReferenceData });
            		      				//},300)
        }

});


