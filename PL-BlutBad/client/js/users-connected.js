// Templates
Template.connected.userConnected = function(){
	return Meteor.users.find({});
};


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