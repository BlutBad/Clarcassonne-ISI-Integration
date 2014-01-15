// Templates

Template.friends.show = function() {
	amigos = Session.get('current_stage') == 'Amigos';
	if (amigos){    
	   $('#gamecontainer').hide();
	   Session.set('showGameIdn', false); 
	}
	return amigos;
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
};

//Events

Template.allUsers.events({
// Aniade a un usuario registrado a la lista de amigos
	'click p.userRegister': function() {
		var userRegister = Meteor.users.findOne({_id: this._id}).username;
		if (userRegister !== Meteor.user().username) {	
			$( "#add-confirm" ).dialog({
				resizable: false,
				height:170,
				modal: true,
				buttons: {
					"Añadir como amigo": function() {
					  	$( this ).dialog( "close" );
				  		var myFriendsId = Friends.findOne({username: Meteor.user().username})._id;
						var newFriend = {name: userRegister};
						Friends.update(myFriendsId, {
							$push: {
								friends: newFriend
							}
						});
					},
					Cancelar: function() {
					  	$( this ).dialog( "close" );
					}
				}
			});
		} else {
			$( "#ifSelectMe" ).dialog();
		}
	}

});

Template.myFriends.events({
// Borra un usuario que formna parte de la lista de amigos
	'click p.list-of-friends': function(){
		var userToDelete = this.name;
		$( "#delete-confirm" ).dialog({
			resizable: false,
			height:180,
			modal: true,
			buttons: {
				"Eliminar": function() {
				  	$( this ).dialog( "close" );
			  		var myFriendsId = Friends.findOne({username: Meteor.user().username})._id;
					var deleteFriend = {name: userToDelete};
					Friends.update(myFriendsId, {
						$pull: {
							friends: deleteFriend
						}
					});
				},
				Cancelar: function() {
				  	$( this ).dialog( "close" );
				}
			}
		});
	}

});
