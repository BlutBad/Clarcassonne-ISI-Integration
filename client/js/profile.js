Template.profil.showprofile = function() { 
	//name= Meteor.user().profile.name;
	//username= Meteor.user().username;
	if (Meteor.user()){
	}
	return Session.get('current_stage') == 'Mi perfil';
};

Template.profil.events({
	'click #datebirthday': function(){
		$(function() {
    		$("#datebirthday").datepicker({
    		  	showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: true,
				dateFormat: "yy-mm-dd"
			});
		});
	}
});




