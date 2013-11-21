
var usersLoaded = false;

$(document).ready(function() {
		$('#coin-slider').coinslider({ width: 800, height:400 });
});

Template.userstemp.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
}

/*
Template.welcome.myuser = function(){
	return Meteor.users.find({"_id": Meteor.userId()});
} 
*/

Meteor.subscribe("users", function () {

	usersLoaded = true;

});


Deps.autorun(function () {
		if(Meteor.userId()){
			$('#container').children().hide();
			$('#container #tabs').fadeIn();
			$('#container #tabs #users').fadeIn();
		} else {
			$('#container').children().hide();
			$('#slider').fadeIn();
		}
	}
);

$(function() {
	$('#tabs').tabs();
});

/*
Meteor.users.find().observe({
 
	changed: function(user) {

		if (usersLoaded) {

			//console.log("New user created: ", user);
			
			//Al iniciar sesion
			$("#container").children().hide();

			//Al desloguearte
			$("#container #tabs,#container #users").fadeIn();		
		}
	}
});
*/

Accounts.ui.config({
	
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"

});
