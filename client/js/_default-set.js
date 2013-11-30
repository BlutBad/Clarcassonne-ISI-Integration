
//Default set de las variables de session
Session.setDefault('current_stage', 'Dashboard');
Session.setDefault('load_game', null);

Session.setDefault('showGameIdn',null);


Meteor.startup(function() {
	$('#gameFrootcontainer').hide();
	$('#gamecanvasAlien').hide();
});