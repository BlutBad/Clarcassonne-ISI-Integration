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

//Templates outbox
Template.outbox.showoutbox = function() {
	return Session.get('mostrarOutbox');
}

Template.outbox.toSend = function() {
	return Session.get('userToOutbox');
}

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
			alert("Tu mensaje:" + text);
			Session.set('mostrarOutbox', false);
		}
	},

	'click input#outbox-cancel': function() {
		Session.set('mostrarOutbox', false);
	}
});