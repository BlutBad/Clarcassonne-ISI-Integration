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

function tienesListaAmigos () {
	var tienesListaAmigos = false;
	if (Friends.findOne({username: Meteor.user().username})) {
		tienesListaAmigos = true;
	}
	return tienesListaAmigos;
}

Template.usersConnected.tienesAmigos = function(){
	var tienesAmigos = false;
	if (tienesListaAmigos()) {
		var numAmigos = Friends.findOne({username: Meteor.user().username}).friends.length;
		if (numAmigos !== 0){
			tienesAmigos = true;
		}
	}
	return tienesAmigos;
};

Template.connected.userConnected = function() {
	return Friends.findOne({username: Meteor.user().username}).friends;


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
	//return //Friends.findOne({username: Meteor.user().username}).friends;
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