Meteor.startup(function () {
	if(Meteor.userId()){
			$('#container').children().hide();
			$('#container #tabs').fadeIn();
			$('#container #tabs #users').fadeIn();
	} else {
			$('#container').children().hide();
			$('#slider').fadeIn();
	}
});


$(document).ready(function() {
		$('#coin-slider').coinslider({ width: 800, height:400 });
});

Template.userstemp.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
}

Template.provisional.conectados = function(){
	return Meteor.users.find({"services.resume.loginTokens" : {$not : []}});
}

var usersLoaded = false;
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

// arreglar el chat
Template.messages.messages=function(){
	return Messages.find({},{sort: {time:-1}});
}

Template.input.events = {
	'keydown input#message':function(event){
		if(event.which==13){
			if (Meteor.user()){
				var name = Meteor.user().username;
			}else{
				var name = 'Anonymous';
			}
			var message = $("#message");
			if (message.val()!=''){
				 Messages.insert({
					name: name,
					message: message.val(),
					time: Date.now()
				 });
				message.val(''); //dejamos la caja de texto vacia
			}
		}	
	}
}


Accounts.ui.config({
	
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"

});
