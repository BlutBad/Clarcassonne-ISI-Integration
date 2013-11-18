
var usersLoaded = false;

$(document).ready(function() {
		$('#coin-slider').coinslider({ width: 500, height:500 });
	});
 

Meteor.subscribe("users", function () {

	usersLoaded = true;

});

Meteor.users.find().observe({
 
	changed: function(user) {

		if (usersLoaded) {
			
			console.log("New user changed: ", user.username);
			//Meteor.Collection("users").insert({name: names[i], score: randomNum()});
		}

	}
	

});

Accounts.ui.config({
	
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"

});



