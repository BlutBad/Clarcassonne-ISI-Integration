Template.profile.showprofile = function() { 
	//name= Meteor.user().profile.name;
	//username= Meteor.user().username;
	if (Meteor.user()){
	}
	return Session.get('current_stage') == 'Mi perfil';
};





