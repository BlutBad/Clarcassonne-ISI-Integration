//Templates
Template.connected.userConnected = function() {
	// console.log("mi usurname is: ");
	// var myUsersId = Meteor.userId();
	// console.log(myUsersId);
	// var myUser = Meteor.users.findOne({_id: myUsersId});
	//return Friends.findOne({username: Meteor.user().username}).friends;
	//console.log(myUser.username);
	
	//return Friends.findOne({username: myUser.username}).friends;
	// var myUser = Meteor.users.findOne({_id: myUsersId});
	// console.log(myUser);
	// console.log(myUser.username);
	// return Friends.findOne({username: myUser.username}).friends;
	return //Friends.findOne({username: Meteor.user().username}).friends;
};


// Events
Template.usersConnected.events({
	'click input#show-users-connected': function() {
		$("#content-users").show();
	},

	'click input#hide-users-connected': function() {
		$("#content-users").hide();
	}
});