//user = "adri";
//password = "123456";
//$("#login-buttons-password").click(function(){
//	alert("bienvenido");
//});

$(document).ready(function() {
		$('#coin-slider').coinslider({ width: 500, height:500 });
	});


Template.loginButtons.events({
	'click': function () {
		alert("as");
	}
});

Accounts.ui.config({

	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"

});
