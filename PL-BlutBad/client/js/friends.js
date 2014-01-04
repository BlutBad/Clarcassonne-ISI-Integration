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

Template.friends.numUsersRegister = function() {
	return Meteor.users.find({}).count();
};

Template.allUsers.userRegister = function() {
	return Meteor.users.find({});
};

Template.myFriends.username = function() {
	return Meteor.user().username;
};

Template.myFriends.showFriends = function() {
	return Friends.findOne({username: Meteor.user().username}).friends;
};

Template.myFriends.numFriends = function() {
	return Friends.findOne({username: Meteor.user().username}).friends.length;
}

//Events

Template.allUsers.events({

	'click p.userRegister': function() {
		var userRegister = Meteor.users.findOne({_id: this._id}).username;
		var myFriendsId = Friends.findOne({username: Meteor.user().username})._id;
		var newFriend = {name: userRegister};
		Friends.update(myFriendsId, {
			$push: {
				friends: newFriend
			}
		});
	}

});