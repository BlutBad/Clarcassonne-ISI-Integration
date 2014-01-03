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
};

Template.allUsers.userRegister = function() {
	return Meteor.users.find({});
};


//Events

Template.allUsers.events({

	'click p.userRegister': function() {
		var id = this._id;
		var username = Meteor.users.findOne({_id: id}).username;
		console.log(username);
	}

});