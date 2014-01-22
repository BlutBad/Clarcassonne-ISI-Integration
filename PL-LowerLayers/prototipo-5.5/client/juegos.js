//////// JUEGOS ////////
//Mira si la partida ha comenzado
Deps.autorun(function() {
	var doc_partidas = Partidas.findOne({_id : Session.get('match_id')});
	if(doc_partidas){
		var empezada = doc_partidas.initiated;
		if(empezada == 'true'){
			$('#clarcassonnecontainer').show();
			ClarcassonneGameIU.initialize('#clarcassonnecanvas', Session.get('match_id'));
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
			players_names.push({"name" : Meteor.users.findOne({_id:entry}).username});
		});
	};
	return players_names;
}


// Abrimos sesión en uno de los juegos
Template.gamestemp.events = {
	'click .linkgame':function(event){
		Session.set('game_id', $(this)[0]._id);
		$('#games').hide();
		$('#matches').fadeIn();
	}
}

Template.matchestemp.events = {
	// Creamos una partida nueva en la base de datos y nos unimos automáticamente
	'click #match_creator':function(event){
			if(!Partidas.findOne({name : $("#match_name").val()})){
				if ($("#match_name").val()!=''){
					Partidas.insert({
						name: $("#match_name").val(),
						game_id: Session.get("game_id"),
						created: new Date(),
						initiated: false,
						finish: false,
						admin_by: Meteor.userId()
					});

					var current_match_id = Partidas.findOne({name: $("#match_name").val()})._id;

					if ($("#match_pass").val()!=''){
						Partidas.update({_id : current_match_id},{$set : {password : sha1Hash($("#match_pass").val())}});
					};

					Session.set('match_id', current_match_id);
					$('#matches').hide();
					$('#roomcontainer').fadeIn();
					if (Games.findOne({_id : Session.get("game_id")}).name=="Alien_Invasion")
						$('#aliencontainer').show();
					else if (Games.findOne({_id :Session.get("game_id")}).name=="Froot_Wars")
						$('#frootwarscontainer').show();
					Partidas.update({_id : Session.get('match_id')},{$push: {jugadores: {user_id: Meteor.userId()}},$inc:{num_players :1}});
					$("#match_name").val('');
					$("#match_pass").val('');
				};
			} else {
				alert("Ya existe una partida con ese nombre. Pruebe con otro.");
			};
	},
	// Entramos en una partida
	'click a.linkmatch':function(event){
		var lim = Games.findOne({_id : $(this)[0].game_id}).players_max;
		var no_limit = Partidas.findOne({_id : $(this)[0]._id}).num_players < lim;
		var players_array = Partidas.findOne({_id : $(this)[0]._id}).jugadores;
		var match_pass = Partidas.findOne({_id : $(this)[0]._id}).password;
		console.log($(".linkmatch_pass." + $(this)[0]._id).val());
		if(match_pass){
			var in_pass = sha1Hash($(".linkmatch_pass." + $(this)[0]._id).val());
		};
		var already_into = players_array.indexOf(Meteor.userId()) != -1;
		if(no_limit || already_into){
			if(match_pass == in_pass || already_into){
				Session.set('match_id', $(this)[0]._id);
				$('#matches').hide();
				$('#roomcontainer').fadeIn();
				$('#empezarboton').hide();
				if(Partidas.findOne({_id : Session.get('match_id')}).admin_by == Meteor.userId()){
					$('#empezarboton').show();
				};

				if (Games.findOne({_id : Session.get('game_id')}).name=="Alien_Invasion")
					$('#aliencontainer').show();
				else if (Games.findOne({_id : Session.get('game_id')}).name=="Froot_Wars")
					$('#frootwarscontainer').show();
				if(!already_into){
					Partidas.update({_id : Session.get('match_id')}, {$push: {jugadores: {user_id: Meteor.userId()}},$inc: {num_players: 1}});
				};
			} else {
				alert("Partida protegida con contraseña. Debe introducir una contraseña correcta.");
			}
		} else {
			Session.set('match_id', undefined);
			alert("Partida llena. Pruebe en otra partida.");
		};

	},
	// Volvemos atrás para elegir otro juego
	'click a#match_back':function(event){
		Session.set('game_id', undefined);
		$('#matches').hide();
		$('#games').fadeIn();
	}
}


Template.roomgametemp.events = {
	// Salimos de una partida
	'click a#exitgame':function(event){
		var quiter_id = Meteor.userId();
		var quited_match_id = Session.get('match_id');
		var players_array = Partidas.findOne({_id : quited_match_id}).jugadores;
		players_array = _.reject(players_array, function(player){ return player == quiter_id; });
		Partidas.update({_id : quited_match_id}, {$set:{jugadores : players_array},$inc: {num_players: -1}});

		if(Partidas.findOne({_id : quited_match_id}).num_players == 0){
			Partidas.remove({_id : quited_match_id});
		} else {
			if(quiter_id == Partidas.findOne({_id : quited_match_id}).admin_by){
				Partidas.update({_id : quited_match_id}, {$set:{admin_by : players_array[0]}});
			};
		};

		Session.set('match_id', undefined);
		$('#clarcassonnecontainer').hide();
		$('#roomcontainer').hide();
		$('#aliencontainer').hide();
		$('#frootwarscontainer').hide();
		$('#matches').fadeIn();

		///ocultar videochat
		endVideoChat();
	}
};


// Pone la partida en "empezada"
Template.roomplayerstemp.events = {
	'click #EmpezarCarca' : function(event){
				if(Partidas.findOne({_id : Session.get('match_id')}).admin_by == Meteor.userId()){
					if(Partidas.findOne({_id : Session.get('match_id')}).num_players >= 3){
						$('#empezarboton').hide();	
						Partidas.update({_id: Session.get('match_id')}, {$set: {initiated: 'true'}});
					} else {
						alert("Se necesitan al menos tres jugadores.");
					}
				} else {
					alert("No eres el administrador de esta partida. Espera hasta que el administrador comience.");
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

//Encuentra partidas
Template.matchestemp.matches = function(){
/*
	
	var partidas_doc = Partidas.find();
	var lista = [];

	partidas_doc.forEach(function(entry){
		lista.push({name : entry.name, created : entry.created, num_players: entry.num_players});
	});
	return lista;
	*/
	return Partidas.find({},{sort:{created:-1}})

}



