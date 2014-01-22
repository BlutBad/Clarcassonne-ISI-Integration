//Templates
Template.usersConnected.estasRegistrado = function(){
	var estasRegistrado;
	if (Meteor.user()) {
		estasRegistrado = true;
	} else {
		estasRegistrado = false;
	}
	return estasRegistrado;
};

Template.usersConnected.tienesAmigos = function(){
	var numAmigos = Friends.findOne({username: Meteor.user().username}).friends.length;
	var tienesAmigos = false;
	if (numAmigos !== 0){
		tienesAmigos = true;
	}
	return tienesAmigos;
};

Template.connected.userConnected = function() {
	return Friends.findOne({username: Meteor.user().username}).friends;
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