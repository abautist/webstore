$(document).ready(function() {
	var dataAmount = $('script[data-amount]').attr('data-amount');
	console.log(dataAmount);

	$('#submitButton').click(function() {
		// e.preventDefault();
		$.ajax({
			url: "localhost:3000/payments/completed",
			method: "POST",
			data: dataAmount
		}).done(function(){
			$('#amount').append(dataAmount);
		});
	});
});
