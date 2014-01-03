// Templates

Template.friends.show = function() {
	return Session.get('current_stage') == 'Amigos';
};

Template.friends.register = function() {
	if (Meteor.user()) {
		var count = Friends.find({username: Meteor.user().username}).count();
		if (count === 0) {
			var userName = Meteor.user().username;
			var userId = Meteor.userId();
			var listFriends = [];
			//friends.push("danny");
			Friends.insert({
				username: userName,
				userid: userId,
				friends: listFriends
			});
		}
		return true;
	} else {
		return false;
	}
};

Template.allUsers.userRegister = function() {
	return Meteor.users.find({});
};

Template.myFriends.username = function() {
	return Meteor.user().username;
};

Template.myFriends.showFriends = function() {

};

//Events

Template.allUsers.events({

	'click p.userRegister': function() {
		var userRegisterId = this._id;
		var myFriendsId = Friends.findOne({username: Meteor.user().username})._id;
		Friends.update(myFriendsId, {$push: {friends: userRegisterId}});
	}

});