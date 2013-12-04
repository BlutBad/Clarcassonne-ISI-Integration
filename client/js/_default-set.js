
//Default set de las variables de session
Session.setDefault('current_stage', 'Dashboard');
Session.setDefault('load_game', null);

Session.setDefault('showGameIdn',null);


Meteor.startup(function() {
	$('#gameFrootcontainer').hide();
	$('#gamecanvasAlien').hide();
});


if (typeof Handlebars !== 'undefined') {
	Handlebars.registerHelper('getUsername', function (userId) {
		var user = _extractProfile(userId);
		if (user) {
			if (user.username)
				return user.username;
			if (user.twitterUsername)
				return user.twitterUsername;
			}
			return ' ';
	});

	Handlebars.registerHelper('getUserId', function () {
		if (Meteor.user()){
			return Meteor.user()._id;
		}
	});

	Handlebars.registerHelper('getUserEmail', function (userId) {
		var user = _extractProfile(userId);
		if (user) {
			if (user.email){
				return user.email;
			}else if (user.services.google.email){
				return user.services.google.email;
			}else if (user.services.facebook.email){
				return user.services.facebook.email;
			};

		};
			return ' ';

	});
}