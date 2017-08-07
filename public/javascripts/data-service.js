 ang.service('getJSON_products',function($http){

 	this.data = function(callback) {
 		
 		$http.get("./data/products.json").then( function (response) { 

				//connect them to VAR 
				var dataReceived = {};
				dataReceived.data = [];
				var responseArrayData = response.data.products.deals;
				angular.forEach(responseArrayData,function(item,index){

					dataReceived.data[index] = {};
					dataReceived.data[index].id = index;
					//by default you want 1 quatinty of product (not in JSON for clarity);
					dataReceived.data[index].qty = 1;
					dataReceived.data[index].description = item.description;
					dataReceived.data[index].thumbnail = item.thumbnail;
					dataReceived.data[index].product_name = item.name;
					dataReceived.data[index].price = item.price;

					if(index==responseArrayData.length-1){
						//get callback with array;
						callback(dataReceived);
					}
				});

		});

 		
 	};
 	   
 })