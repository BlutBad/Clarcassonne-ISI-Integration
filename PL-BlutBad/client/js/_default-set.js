
//Default set de las variables de session
Session.setDefault('current_stage', 'Dashboard');
Session.setDefault('load_game', null);
Session.setDefault('showGameIdn',null);
Session.setDefault("current_game",null);
Session.setDefault('gamerank', null);


//Variables de session para las torneos, multi-torneo en cuestion
Session.setDefault("multiMenuTorneoActive",null);

Session.setDefault('etapasTorneoActive', "participantes");
Session.setDefault('soloMenuTorneoActive', "participantes");


Session.setDefault('showTorneoComents', null);


Session.setDefault('current_party_id_webRTC', null);



Session.setDefault("partidaEnCursoMultiJuegos", null);
Session.setDefault("isRunningWebRTC", false);


Meteor.startup(function() {
    $('#gamecontainer').hide();    
	$('#gameFrootcontainer').hide();
	$('#gamecanvasAlien').hide();
	$('#CanvasclarcaGameDIV').hide();
});


if (typeof Handlebars !== 'undefined') {
	Handlebars.registerHelper('getUsername', function (userId) {
		var user = _extractProfile(userId);
		if (user) {
			if (user.name){
				return user.name;
			};
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

	//Admin panel/content
	Handlebars.registerHelper('showIfAdmin', function () {
		if (Meteor.user()){
			if (Meteor.user().username == "admin"){
				return true;
			}
		}
		return false;
	});


	Handlebars.registerHelper('getUserEmail', function (userId) {
		var user = _extractProfile(userId);
		//console.log(user);
		if (user) {
			if (user.email){
				//console.log(user.email);
				return user.email;
			}else if (user.services){
				if (user.services.google.email){
					return user.services.google.email;
				}else if (user.services.facebook.email){
					return user.services.facebook.email;
				};
			};
		};
			return ' ';

	});
	Handlebars.registerHelper('getUserDateBirth', function (userId) {
		var user = _extractProfile(userId);
		if (user) {
			if (user.datebirth){
				return user.datebirth;
			};

		};
			return ' ';

	});
	Handlebars.registerHelper('getUserGender', function (userId) {
		var user = _extractProfile(userId);
		if (user) {
			if (user.genero){
				return user.genero;
			};

		};
			return ' ';

	}); 
} 