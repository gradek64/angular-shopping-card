ang.service('currency_converter',function($http,$q){

	that = this;
	that.currencies = 'USD,AUD,CAD,PLN,GBP';
	that.currenciesRate  = [];

	//execute this once is ready to be loaded; 
 	that.data = (function() {
 						
 						// set promose 
 						var deferred = $q.defer();
 						currenciesArray = that.currencies.split(",");
				 		$http({
						        url:"http://apilayer.net/api/live",
						        params:{
						          access_key:'a8ccc7ed44ccc9de1352e6882f758517',
						          currencies:that.currencies,
						          format:1
						        }

				      }).then(function(response) {


				      		deferred.resolve(response);

	
				      		//populate that.currenciesRate object;
				      		Object.keys(response.data.quotes).forEach(function(value,key) {

				            	that.currenciesRate[key] = {};
				            	that.currenciesRate[key].currency = currenciesArray[key];
				            	that.currenciesRate[key].currencyValue = response.data.quotes[value];

				            });
				             
				       });


		 return deferred.promise;

    })();

    

    that.convert = function(value){

    			console.log( value );
    			//var picked_currency = that.currenciesRate[currency];



    			return value;

   	};

 	   
 });    
