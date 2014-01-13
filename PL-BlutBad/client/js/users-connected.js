// Templates
// Template.connected.userConnected = function() {
// 	return Friends.findOne({username: Meteor.user().username}).friends;
// };


// Events
Template.usersConnected.events({
	'click input#show-users-connected': function() {
		$("#connected").show();
		$("#hide-users-connected").show();
	},

	'click input#hide-users-connected': function() {
		$("#connected").hide();
		$("#hide-users-connected").hide();
	}
});