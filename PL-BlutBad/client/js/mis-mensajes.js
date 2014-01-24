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
		alert("Tu mensaje sera enviado proximamente.");
		Session.set('mostrarOutbox', false);
	},

	'click input#outbox-cancel': function() {
		Session.set('mostrarOutbox', false);
	}
});