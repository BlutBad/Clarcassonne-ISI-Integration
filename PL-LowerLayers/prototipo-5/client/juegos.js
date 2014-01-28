//////// JUEGOS ////////
//Mira si la partida ha comenzado
Deps.autorun(function() {
	var doc_partidas = Partidas.findOne({_id : Session.get('match_id')});
	if(doc_partidas){
		var empezada = doc_partidas.initiated;
		if(empezada == 'true' && !Session.get("match_initiated")){
			Session.set("match_initiated",true);
			$('#clarcassonnecontainer').show();
			ClarcassonneGameIU.initialize('#clarcassonnecanvas', Session.get('match_id'));		

			console.log("Empiezo");
			
			/*Partidas.update(doc_partidas._id, {
                            $push : {puntuacion : [ {user_id: doc_partidas.jugadores[0].user_id, puntos : 1000},
                                                    {user_id: doc_partidas.jugadores[1].user_id, puntos : 2000},
                                                    {user_id: doc_partidas.jugadores[2].user_id, puntos : 3000}]},
                            $set  : {terminada: true}
            });*/
            
            //Meteor.call("partyFinish", doc_partidas._id);	

		};
	};
});

// Encripta
Number.prototype.toHexStr = function()
{
	var s="", v;
	for (var i=7; i>=0; i--) { v = (this>>>(i*4)) & 0xf; s += v.toString(16); }
	return s;
}
function f(s, x, y, z)
{
	switch (s) {
	case 0: return (x & y) ^ (~x & z);
	case 1: return x ^ y ^ z;
	case 2: return (x & y) ^ (x & z) ^ (y & z);
	case 3: return x ^ y ^ z;
	}
}

function ROTL(x, n){
	return (x<<n) | (x>>>(32-n));
} 
function sha1Hash(msg) {
	var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
	msg += String.fromCharCode(0x80); 
	var l = Math.ceil(msg.length/4) + 2; 
	var N = Math.ceil(l/16);
	var M = new Array(N);
	for (var i=0; i<N; i++) {
		M[i] = new Array(16);
		for (var j=0; j<16; j++) { 
			M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
			(msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
		}
	}
	M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
	M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;
	var H0 = 0x67452301;
	var H1 = 0xefcdab89;
	var H2 = 0x98badcfe;
	var H3 = 0x10325476;
	var H4 = 0xc3d2e1f0;
	var W = new Array(80); var a, b, c, d, e;
	for (var i=0; i<N; i++) {
		for (var t=0; t<16; t++){
			W[t] = M[i][t];
		}
		for (var t=16; t<80; t++){ 
			W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
		}
		a = H0; b = H1; c = H2; d = H3; e = H4;
		for (var t=0; t<80; t++) {
			var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
			var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
			e = d;
			d = c;
			c = ROTL(b, 30);
			b = a;
			a = T;
		}
		H0 = (H0+a) & 0xffffffff;
		H1 = (H1+b) & 0xffffffff;
		H2 = (H2+c) & 0xffffffff;
		H3 = (H3+d) & 0xffffffff;
		H4 = (H4+e) & 0xffffffff;
	}
	return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() + H3.toHexStr() + H4.toHexStr();
}

//Código para la unión a una partida
joinmatch = function(match_id, viewer) {
	var initiated = Partidas.findOne({_id : match_id}).initiated;
	var lim = Games.findOne({_id : Session.get('game_id')}).players_max;
	var no_limit = Partidas.findOne({_id : match_id}).num_players < lim;
	var players_array = Partidas.findOne({_id : match_id}).jugadores;
	var match_pass = Partidas.findOne({_id : match_id}).password;
	var have_profile = Meteor.users.findOne({_id : Meteor.userId()}).birthday;

	// Si tiene un perfil (con edad) puede entrar.
	if(have_profile || viewer){
		
		// Si la partida tiene contraseña, guarda la introducida por el jugador que se quiere unir.
		if(match_pass){
			var in_pass = sha1Hash($(".linkmatch_pass." + match_id).val());
		};
		var already_into = Partidas.findOne({_id : match_id, jugadores : {user_id : Meteor.userId()}}) != undefined;

		if(!initiated || already_into || viewer){
			// Si está dentro o la partida no está llena o es un observador	
			if(no_limit || already_into || viewer){
				if(match_pass == in_pass || already_into){
					Session.set('match_id', match_id);
					$('#matches').hide();
					$('#roomcontainer').fadeIn();
					if (Games.findOne({_id : Session.get('game_id')}).name=="Alien_Invasion")
						$('#aliencontainer').show();
					else if (Games.findOne({_id : Session.get('game_id')}).name=="Froot_Wars")
						$('#frootwarscontainer').show();

					// Si ya estaba dentro o es observador
					if(!already_into && !viewer){
						Partidas.update({_id : Session.get('match_id')}, {$push: {jugadores: {user_id: Meteor.userId()}},$inc: {num_players: 1}});
						var full = Partidas.findOne({_id : Session.get('match_id')}).num_players >= Partidas.findOne({_id : Session.get('match_id')}).players_max;
						Partidas.update({_id : Session.get('match_id')},{$set: {full : full}});
					};

					// Si ya estaba dentro e intenta entrar como observador
					if(already_into && viewer){
						$("#dialog_alreadyinto").dialog("open");
					};

					// Si es un observador
					if(viewer){
						if(Partidas.findOne({_id : Session.get("match_id")}).initiated){
							ClarcassonneGameIU.initialize('#clarcassonnecanvas', Session.get('match_id'));
						};
					};
				} else {
					$( "#dialog_password" ).dialog("open");
				};
			} else {
				Session.set('match_id', undefined);
				$( "#dialog_fullmatch" ).dialog("open");
			}
		} else {
			$("#dialog_initiated").dialog("open");
		};
	} else {
		$( "#dialog_birthdate" ).dialog("open");
		$("#error_birthdialog").remove();
	};
}

//Carga el nombre del juego
Template.gamenametemp.gamename=function(){
	var gameName = "None";
	if(Games.findOne({_id: Session.get('game_id')})){
		gameName = Games.findOne({_id: Session.get('game_id')}).name;
	};
	return gameName;
}
//Carga el título de la partida
Template.matchnametemp.matchname=function(){
	var matchName = "None";
	if(Partidas.findOne({_id: Session.get('match_id')})){
		matchName = Partidas.findOne({_id: Session.get('match_id')}).name;
	};
	return matchName;
}
//Carga los jugadores presentes en una partida
Template.roomplayerstemp.players=function(){	
	var matches_document = Partidas.findOne({_id : Session.get('match_id')});
	var players_list;
	var players_names = [];
	if(matches_document){
		players_list = matches_document.jugadores;
		players_list.forEach(function(entry){
			players_names.push({"name" : Meteor.users.findOne({_id:entry.user_id}).username});
		});
	};
	return players_names;
}


// Abrimos sesión en uno de los juegos
Template.gamestemp.events = {
	'click .linkgame':function(event){
		Session.set('game_id', $(this)[0]._id);
		if(Games.findOne({_id : Session.get("game_id")}).name=="Alien_Invasion" || Games.findOne({_id : Session.get("game_id")}).name=="Froot_Wars"){
			$('#games').hide();
			var current_match_id = Partidas.insert({
				game_id: Session.get("game_id"),
				created: new Date(),
				initiated: true,
				finish: false,
				admin_by: Meteor.userId()
			});
			Session.set('match_id', current_match_id);
			$('#matches').hide();
			$('#roomcontainer').fadeIn();
			if (Games.findOne({_id : Session.get("game_id")}).name=="Alien_Invasion"){
				$('#aliencontainer').show();
				$('#aliencontainer').append("<canvas id='aliencanvas' width='320' height='480'></canvas>");
/*---------*/	GameAlien.initialize("aliencanvas",spritesAlien,startGameAlien);
			}else if (Games.findOne({_id :Session.get("game_id")}).name=="Froot_Wars"){
				$('#frootwarscontainer').show();
				$('#frootwarscontainer').prepend("<canvas id='gamecanvas' width='640' height='480' class='gamelayer'></canvas>");
				game.init();

			}
			Partidas.update({_id : Session.get('match_id')},{$push: {jugadores: {user_id: Meteor.userId()}},$inc:{num_players :1}});
		} else {
			$('#games').hide();
			$('#matches').fadeIn();
		};
	}
}

Template.matchestemp.events = {
	// Creamos una partida nueva en la base de datos y nos unimos automáticamente
	'click #match_creator':function(event){
		var have_profile = Meteor.users.findOne({_id : Meteor.userId()}).birthday;
		if(have_profile ){
			if(!Partidas.findOne({name : $("#match_name").val()})){
				if ($("#match_name").val()!=''){
					var ugly_date =  new Date();
					var pretty_date = ugly_date.toUTCString().split(" GMT")[0];
					Partidas.insert({
						name: $("#match_name").val(),
						game_id: Session.get("game_id"),
						created: ugly_date,
						date: pretty_date,
						initiated: false,
						finish: false,
						saved: false,
						admin_by: Meteor.userId(),
						players_max: Games.findOne({_id : Session.get("game_id")}).players_max,
						full: false
					});

					var current_match_id = Partidas.findOne({name: $("#match_name").val()})._id;

					if ($("#match_pass").val()!=''){
						Partidas.update({_id : current_match_id},{$set : {password : sha1Hash($("#match_pass").val())}});
					};

					Session.set('match_id', current_match_id);
					$('#matches').hide();
					$('#roomcontainer').fadeIn();
					if (Games.findOne({_id : Session.get("game_id")}).name=="Alien_Invasion"){
						$('#aliencontainer').show();
					}else if (Games.findOne({_id :Session.get("game_id")}).name=="Froot_Wars"){
						$('#frootwarscontainer').show();
					}
					Partidas.update({_id : Session.get('match_id')},{$push: {jugadores: {user_id: Meteor.userId()}},$inc:{num_players :1}});
					var full = Partidas.findOne({_id : Session.get('match_id')}).num_players >= Partidas.findOne({_id : Session.get('match_id')}).players_max;
					Partidas.update({_id : Session.get('match_id')},{$set: {full : full}});
					$("#match_name").val('');
					$("#match_pass").val('');
				};
			} else {
				$( "#dialog_matchname" ).dialog("open");
			};
		} else {
			$("#error_birthdialog").remove();
			$( "#dialog_birthdate" ).dialog("open");
		};
	},
	// Entramos en una partida
	'click button.linkmatch':function(event){
		viewer = false;
		joinmatch($(this)[0]._id, viewer);
	},
	// Volvemos atrás para elegir otro juego
	'click #match_back':function(event){
		Session.set('game_id', undefined);
		$('#matches').hide();
		$('#games').fadeIn();
	},
	// Iniciamos como observador
	'click .viewmatch': function(event){
		var viewer = true;
		joinmatch($(this)[0]._id, viewer);
	},
	// Iniciamos una partida aleatoria
	'click #random_button':function(event){
		var game_id = Session.get('game_id');
		var limit = Games.findOne({_id : game_id}).players_max;
		var document = Partidas.find({game_id : game_id, initiated : false, finish : false, num_players : {$lt : limit}});
		var publics = [];
		document.forEach(function(entry){
			if(!entry.password){
				publics.push(entry);
			};
		});
		if(publics.length != 0){
			var chosen = publics[Math.floor(Math.random()*publics.length)];
			joinmatch(chosen._id);
		} else {
			$("#dialog_nomatches").dialog("open");
		};
	}
}


Template.roomgametemp.events = {
	// Salimos de una partida
	'click #exitgame':function(event){
		var quiter_id = Meteor.userId();
		var quited_match_id = Session.get('match_id');
		var quited_game_id = Session.get('game_id');
		var players_array = Partidas.findOne({_id : quited_match_id}).jugadores;
		var found = false;

		players_array.forEach(function(entry){
			if(entry.user_id == quiter_id){
				found = true;
			};
		});

		if(found){
			players_array = _.reject(players_array, function(player){ return player.user_id == quiter_id; });
			Partidas.update({_id : quited_match_id}, {$set:{jugadores : players_array},$inc: {num_players: -1}});
			var full = Partidas.findOne({_id : Session.get('match_id')}).num_players >= Partidas.findOne({_id : Session.get('match_id')}).players_max;
			Partidas.update({_id : Session.get('match_id')},{$set: {full : full}});
		};

		if(Partidas.findOne({_id : quited_match_id}).num_players == 0){
			Partidas.remove({_id : quited_match_id});
		} else {
			if(quiter_id == Partidas.findOne({_id : quited_match_id}).admin_by){
				Partidas.update({_id : quited_match_id}, {$set:{admin_by : players_array[0]}});
			};
		};

		var weAreAlien = Games.findOne({_id : quited_game_id}).name;
		var weAreFroot = Games.findOne({_id : quited_game_id}).name;

		if (weAreAlien =="Alien_Invasion"){
			$('#aliencanvas').remove();
			GameAlien.desactivar();
		}else if (weAreFroot =="Froot_Wars"){
			game.ended = true;					
			game.showEndingScreen();
			$('#gamecanvas').remove();
		}

		Session.set('match_id', undefined);
		$('#clarcassonnecontainer').hide();
		$('#roomcontainer').hide();
		$('#aliencontainer').hide();
		$('#frootwarscontainer').hide();
		$('#matches').fadeIn();

		if (weAreAlien =="Alien_Invasion" || weAreFroot =="Froot_Wars"){
			Session.set('game_id', undefined);
			$('#matches').hide();
			$('#games').fadeIn();
		};

		///ocultar videochat
		if(Session.get("video_on")){
			endVideoChat();
			Session.set("video_on",false);
		};

		///Remover compartir redes sociales
		$(".tweetbtn").html("");
		$(".fbsharebtn").html("");
		$(".gsharebtn").html("");
	}
};


// Pone la partida en "empezada"
Template.roomplayerstemp.events = {
	'click #EmpezarCarca' : function(event){
		if(Partidas.findOne({_id : Session.get('match_id')}).admin_by == Meteor.userId()){
			if(Partidas.findOne({_id : Session.get('match_id')}).num_players >= 3){
				Partidas.update({_id: Session.get('match_id')}, {$set: {initiated: 'true'}});
			} else {
				$("#dialog_threeplayers").dialog("open");
			}
		} else {
			$("#dialog_noadmin").dialog("open");
		};
	}
};

// Devuelve 'true' si eres administrador para representar el botón de empezar
Template.roomplayerstemp.admin = function() {
	var isAdmin = false;
	if(Meteor.userId() && Session.get('match_id')){
		isAdmin = Meteor.userId() == Partidas.findOne({_id : Session.get('match_id')}).admin_by;
	};
	return isAdmin;
}

// Devuelve 'true' si juegas al carca
Template.roomplayerstemp.carca = function() {
	var isCarca = false;
	if(Games.findOne({_id : Session.get("game_id")})){
		isCarca = Games.findOne({_id : Session.get("game_id")}).name=="Clarcassonne";
	};
	return isCarca;
}

//Encuentra partidas
Template.matchestemp.matches = function(){
	return Partidas.find({},{sort:{created:-1}})
}



