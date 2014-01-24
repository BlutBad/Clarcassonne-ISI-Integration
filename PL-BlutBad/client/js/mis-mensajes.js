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
	//Hacer una variable de sesión
	return true;
}

Template.outbox.toSend = function() {
	//Hacer una variable de sesion
	return "XXX";
}

//Events