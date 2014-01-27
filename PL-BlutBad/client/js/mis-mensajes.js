//Templates inbox
Template.inbox.show = function() {
	showInbox = Session.get('current_stage') == 'Mis mensajes';
	if (showInbox){    
	   $('#gamecontainer').hide();
	   Session.set('showGameIdn', false); 
	}
	return showInbox;
};

Template.inbox.register = function() {
	if (Meteor.user()) {
		return true;
	} else {
		return false;
	}
};

Template.inbox.contentMsg = function() {
	return Session.get('contentMsg');
};

//Templates listMsg
Template.listMsg.tienesMensajes = function() {
	var hayMensajes = Mensajes.find({destino: Meteor.user().username}).count();
	if (hayMensajes !== 0) {
		return true;
	} else {
		return false;
	}
};

Template.listMsg.mensajes = function() {
	return Mensajes.find(
					{destino: Meteor.user().username}, 
					{sort: {time: -1}
				});
};

//Templates outbox
Template.outbox.showoutbox = function() {
	return Session.get('mostrarOutbox');
};

Template.outbox.toSend = function() {
	return Session.get('userToOutbox');
};

//Events

Template.outbox.events({
	'click input#outbox-send': function() {
		var text = $("#outbox-msg").val();
		if (text === "") {
			$( "#notMsg" ).dialog({
				resizable: false,
				height:170,
				modal: true,
				buttons: {
					Aceptar: function() {
					  	$( this ).dialog( "close" );
					}
				}
			});
		} else {
			Session.set('mostrarOutbox', false);
			var source = Meteor.user().username;
			var to = Session.get('userToOutbox');
			Mensajes.insert({
				origen: source,
				destino: to,
				mensaje: text,
				time: Date.now()
			})
			$( "#SendOk" ).dialog({
				resizable: false,
				height:170,
				modal: true,
				buttons: {
					Aceptar: function() {
					  	$( this ).dialog( "close" );
					}
				}
			});
		}
	},

	'click input#outbox-cancel': function() {
		Session.set('mostrarOutbox', false);
	}
});

Template.listMsg.events({
	'click .listOfMsgInbox': function() {
		Session.set('contentMsg', Mensajes.findOne({_id: this._id}).mensaje);
	}
});