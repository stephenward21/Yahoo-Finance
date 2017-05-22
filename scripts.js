// Make an AJAX request when user submits the form
//give user the ability to search for multiple symbols.
//multiple will bring back an array inside of 'quote'. A single will bring back Object.


$(document).ready(function(){
	$('.yahoo-finance-form').submit((event)=>{

		var userStockSavedIfAny = localStorage.getItem('lastSymbolSearched');
		console.log(userStockSavedIfAny);
		event.preventDefault(); // prevent the browser from submitting the form
		console.log("this form was submitted");
		var symbol = $('#symbol').val();
		// Store in local storage(new version cookies), that will last even after the browser closes or changes pages.
		localStorage.setItem("lastSymbolSearched", symbol);

		var url = 'http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+symbol+'%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		console.log(url);


		// AJAX request for the yahoo API.
		// does not have to be "data" as the argument. Can name it anything. Its a local variable inside of funciton.

		$.getJSON(url, (data)=>{
			console.log(data);
			
			
			var newRow = getNewRow(data)
			$('#stock-ticker-body').append(newRow);


		});
	});
			
			//utility function to generate new rows of HTML for what "data" we pass in.
			function getNewRow(data){
				var stockInfo = data.query.results.quote;
				var newHTML = ''

				if(stockInfo.Ask == null){
					stockInfo.Ask = "Not Available for this stock";
				}
				if(stockInfo.Change !== null){
					if(stockInfo.Change.indexOf('+') > -1){
						var classChange = "success";
					}else{
						var classChange = "danger";
					}			
				}

				newHTML += '<tr>';
					newHTML +='<td>' + stockInfo.Symbol + '</td>'
					newHTML +='<td>' + stockInfo.Name + '</td>'
					newHTML +='<td>' + stockInfo.Ask + '</td>'
					newHTML +='<td>' + stockInfo.Bid + '</td>'
					newHTML +='<td class="bg-' + classChange + '">' + stockInfo.Change + '</td>'
				newHTML += '</tr>'

				return newHTML;



			}
			

		



});