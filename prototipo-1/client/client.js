
var usersLoaded = false;

$(document).ready(function() {
		$('#coin-slider').coinslider({ width: 500, height:500 });
});

Template.userstemp.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
} 

Meteor.subscribe("users", function () {

	usersLoaded = true;

});

Meteor.users.find().observe({
 
	changed: function(user) {

		if (usersLoaded) {

			//console.log("New user created: ", user);
			
			//Al iniciar sesion
			$("#container").children().hide();

			//Al desloguearte
			$("#container #tabs,#container #users").fadeIn();

			/*$(function() {
				$('#tabs').tabs();
			});*/
		}

	}

});

Accounts.ui.config({
	
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"

});
