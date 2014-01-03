// Templates

Template.friends.show = function() {
	return Session.get('current_stage') == 'Amigos';
};

Template.friends.register = function() {
	if (Meteor.user()) {
		return true;
	} else {
		return false;
	}
}

Template.allUsers.userRegister = function() {
	return Meteor.users.find({});
}