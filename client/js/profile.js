Template.profil.showprofile = function() { 
	//name= Meteor.user().profile.name;
	//username= Meteor.user().username;
	if (Meteor.user()){
	}
	return Session.get('current_stage') == 'Mi perfil';
};

Template.profil.registrado=function(){
	if (Meteor.user()) {
		return true;
	}else{
		return false;
	}

};

Template.profil.events({
	'click #datebirthday': function(){
		$(function() {
    		$("#datebirthday").datepicker({
    		  	showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: false,
				changeMonth: true,
      			changeYear: true,
				dateFormat: "yy-mm-dd"
			});
		});
	}
});




