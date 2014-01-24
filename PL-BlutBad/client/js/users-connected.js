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

Template.connected.events({
	// Cuando se selecciona a un amigo de mis lista de amigos
	'click p.userConnected': function() {
		var userToSend = this.name;
		$( "#dialog-outbox" ).dialog({
				resizable: false,
				height:170,
				modal: true,
				buttons: {
					"Aceptar": function() {
						$( this ).dialog( "close" );
						Session.set('mostrarOutbox', true);
						Session.set('userToOutbox', userToSend);
					},
					Cancelar: function() {
					  	$( this ).dialog( "close" );
					}
				}
			});

	}
});