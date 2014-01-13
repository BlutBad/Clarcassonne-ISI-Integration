//Muestro la pantalla inicial en funcion de si se ha logeado
Meteor.startup(function () {
	if(Meteor.userId()){
			$('#container').children().hide();
			$('#container #tabs').fadeIn();
			$('#friends').fadeIn();
	} else {
			$('#container').children().hide();
			$('#slider').fadeIn();
	}
	$('#matches').hide();
	$('#roomcontainer').hide();
	$('#aliencontainer').hide();
	$('#frootwarscontainer').hide();
//---------------------------------------------
	$('#clarcassonnecontainer').hide();
	$("#byuserranking").hide();
});

//Cargo el efecto slider y pestañas
$(document).ready(function() {
		$('#coin-slider').coinslider({ width: 800, height:400 });
		$('#tabs').tabs();
		$(function() {
			$("#accordion").accordion();
		});
		 $(function() {
			$( "#chatTabs" ).tabs({collapsible: true});
		});
		
		$("#friends").css({"top": $(window).height()-57, "position":"fixed"});
		$("#friends").css("left",$(window).width()-182);
		$("#accordion").css("top",10);
		$("#accordion").css({"left":$(window).width()-183, "position":"fixed"});
		$("#tabs").css("width",$(window).width()-240);
		$("#chatTabs").css("width",$(window).width()-240);
		$("#chatTabs").css("top",$(window).height()-58);


		$("#friends").click(function() {
			if($("#friends").hasClass("escondido")){
				$("#friends").removeClass();
				$("#friends").addClass("mostrada");
				$('#accordion').fadeIn();
			}else{
				$("#friends").removeClass();
				$("#friends").addClass("escondido")
				$('#accordion').hide();
			}	
			
		});

});

////// RELLENAR PLANTILLAS /////////

//Ordena los amigos alfabeticamente
Template.userstemp.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
}

//Encuentra juegos
Template.gamestemp.games=function(){
	return Games.find();
}

//Encuentra juegos para ranking
Template.gamesrankingtemp.games=function(){
	return Games.find();
}

//Mostramos puntuaciones para un juego
Template.gamesrankingtemp.events = {
	'click .linkgameranking':function(event){
		$("#ranking").children().hide();
		$("#ranking").append($(this)[0].name);
		Session.set('game', $(this)[0].name);
	}
}

// Mostramos puntuaciones para un usuario
Template.userstemp.events = {
	'click .linkuserranking':function(event){
		$("#ranking").children().hide();
		$("#ranking").append($(this)[0].username);
		Session.set('user', $(this)[0].username);
		$("#byuserranking").fadeIn();
		//console.log(Games.findOne({_id : Session.get('game_id')}).name);//$(this)[0]._id);
	}
}

//Encuentra usuarios conectados
Template.loguserstemp.logusers = function(){
	return Meteor.users.find({"services.resume.loginTokens" : {$not : []}});
}

//Encuentra partidas
Template.matchestemp.matches = function(){
	return Partidas.find();
}

//Carga mensajes del chat
Template.messagestemp.messages=function(){
	return Messages.find();
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

//Carga puntuaciones para usuario
Template.byuserrankingtemp.ranking=function(){
	var ranking = Ranking.find({user: Session.get("user")});
	return ranking;
}

///////////// SUSBSCRIPCIONES ////////////////

//Subscripcion a lista de usuarios
var usersLoaded = false;
Meteor.subscribe("users", function () {
	usersLoaded = true;

});
//Subscripcion a lista de mensajes
Meteor.subscribe("messages");
//Subscripcion a lista de juegos
Meteor.subscribe("games");


//Subscripción selectiva a la lista de partidas
Deps.autorun(function () {
	var current_game_id = Session.get("game_id")
	Meteor.subscribe("partidas", current_game_id);
});

//Subscripción selectiva a los mensajes de la sala
Deps.autorun(function () {
	var current_match_id = Session.get("match_id")
	Meteor.subscribe("messages", current_match_id);
});

//Subscripción selectiva a ranking
Deps.autorun(function () {
	var selected_game_id = Session.get("game")
	var selected_user_id = Session.get("user")
	console.log("selectedgame: "+selected_game_id);
	console.log("selecteduser: "+selected_user_id);
	Meteor.subscribe("ranking", selected_game_id, selected_user_id);
});


//Cambios reactivos de la interfaz
Deps.autorun(function () {

	//Cambio lo que se muestra en la interfaz en funcion de la sesion
	if(Meteor.userId()){
		$('#container').children().hide();
		$('#container #tabs').fadeIn();
		$('#friends').fadeIn();
	}else{
		$('#container').children().hide();
		$('#slider').fadeIn();
	}
});


//Inserta mensajes del chat de sala
Template.input.events = {
	'keydown input#message':function(event){
		if(event.which==13){
			if (Meteor.user()){
				var name = Meteor.user().username;
			}else{
				var name = 'Anonymous';
			}
			var message = $("#message");
			if (message.val()!=''){
				 Messages.insert({
					name: name,
					message: message.val(),
					time: Date.now(),
					match_id: Session.get('match_id')
				 });
				message.val(''); //dejamos la caja de texto vacia
			}
		}	
	}
}

/////////// CHAT PRIVADO //////////

//Pinta lista de amigos conectados, tiene que ser reactivo porque no esta disponible desde el comienzo
Deps.autorun(function () {
	Template.listaAmigosOnlineTemp.listaAmigosOnline = function(){
		if (Meteor.user()){
			if (Meteor.user().amigos!=undefined){
				amigos=Meteor.user().amigos;
				return Meteor.users.find({$and: [{_id: {$in: amigos}},{"services.resume.loginTokens" : {$not : []}}]});
			}	
		}	
	}		
});


//Pinta lista de amigos desconectados, tiene que ser reactivo porque no esta disponible desde el comienzo
Deps.autorun(function () {
	Template.listaAmigosOfflineTemp.listaAmigosOffline = function(){
		if (Meteor.user()){
			if (Meteor.user().amigos!=undefined){
				amigos=Meteor.user().amigos;
				return Meteor.users.find({$and: [{_id: {$in: amigos}},{"services.resume.loginTokens" :  []}]});
			}	
		}	
	}		
});


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

var mychats = new Array();
//Cada vez que hago click en un amigo conectado se inserta una pestaña de chat
//y se añade a un array el id del usuario clickeado para saber las conversaciones
//activas y no abrirlas de nuevo si lo estan. Se muestra la plantilla.
//En un futuro la llegada de un mensaje desde otro usuario habra que asociarla
//al mismo evento de insertar ventana y modificar el array.
Template.listaAmigosOnlineTemp.events = {
	'click a.linkchat':function(event){
		Session.set('userdest_id', $(this)[0]._id);
		var indice=mychats.indexOf(Session.get('userdest_id'));
		var userdest=Meteor.users.findOne({_id: Session.get('userdest_id')});
		if (indice==-1){
			mychats.push(Session.get('userdest_id'));
			$("#chatTabs ul").append("<li id='"+Session.get('userdest_id')+"'> <a href='#"+userdest.username+"'>"+userdest.username+"</a><button type='button' class='closechattab'>x</button></li>");
			$("#chatTabs").append("<div id='"+userdest.username+"'> mensajes con "+userdest.username+"</div>")
			$("#chatTabs").tabs("refresh");
		}else{
			$("#"+Session.get('userdest_id')+" a").trigger('click');
		}
		if (mychats.length!=0)
			$("#chatTabs").fadeIn();	
	}
}

//Si hago click en la cruz de la pestaña se cierra ésta y se elimina del array
//la conversacion. Si no quedan conversaciones se oculta la plantilla
$(document).on("click", ".closechattab", function() {
        var userdest_id=($(this).parent().attr("id"));
        var indice=mychats.indexOf(userdest_id);
        var userdest=Meteor.users.findOne({_id: userdest_id});
        mychats.splice(indice,1);

		$("#"+userdest_id).remove();
		$("#"+userdest.username).remove();
		$("#chatTabs").tabs("refresh");
		if (mychats.length==0)
			$("#chatTabs").hide();
});


//Para buscar y añadir usuarios, esta detecta cuando se escribe en el formulario
Template.friendsTemp.events = {
	'keydown input#formSearch':function(event){
		if(event.which==13){
			if ($("#formSearch").val()!=''){
				searchUsers($("#formSearch").val());
			}
		}
	},'click input#buttonSearch': function (event) { //añade o borra con con enter
			if ($("#formSearch").val()!=''){
				searchUsers($("#formSearch").val());
			}
		}
}
//busca y te da opcion a agregar si no es tu amigo. si ya es amigo o ya existe o eres tu no te deja o te deja borrar
//en caso de que sea ya amigo
function searchUsers(user) {

	$("#formSearch").prop('value', '');
	
	var encontrado = false;
	var id;
	Meteor.users.find({}).forEach(function(player) {
		if( user == player.username){
			id = player._id;
			encontrado = true;
		}
	});
	if(encontrado){
		if(Meteor.userId()!=id){
			if (!isAmigo(id)){
				addingFriend(user,id);
			}else{
				rmingFriend(user,id);
			}
		}else{
			$.ambiance({message: "You are " + user, type: "error", fade: false});
		}
	}else {
		$.ambiance({message: "User: " +user+ " not found!", type: "error", fade: false});
	}
}
//comprueba si la persona que te quiere agregar es amigo
function isAmigo (id) {
	amigos = Meteor.user().amigos;		
	if (amigos == undefined){
		return false;
	}
	var encontrado = false;
	amigos.forEach(function(amigo) {
		if(amigo == id){
			encontrado = true;
		}
	});
	if(encontrado){
		return true;
	}
	return false;
}

//agrega a los dos usuarios a amigos respectivamente
function addingFriend(user,id) {
	var button = $(window.document.createElement('button'))
		.attr('id', 'AddButtFriend').addClass("btn btn-primary").html("Agregar");
	$.ambiance({message: button, type: "success", title: user, timeout: 3});
	$("#AddButtFriend").click(function() {	
		Meteor.users.update({_id: Meteor.userId()}, {$push: {amigos: id}});
		Meteor.users.update({_id: id}, {$push: {amigos: Meteor.userId()}});
		$.ambiance({message: "You and "+user+" are now friends!", title: "Success!",type: "success"});
	});
}
//borra a los dos usuarios a amigos respectivamente
function rmingFriend(user,id) {
	var button = $(window.document.createElement('button'))
		.attr('id', 'RmButtFriend').addClass("btn btn-primary").html("Borrar");
	$.ambiance({message: button, type: "error", title: user+ " is already your friend!", timeout: 3});
	$("#RmButtFriend").click(function() {
		deleteFriend(id,Meteor.userId());
		deleteFriend(Meteor.userId(),id);	
		$.ambiance({message: "You and "+user+" are not friends!", title: "Success!",type: "success"});
	});	
}
//si borra actualiza sus bases de datos
function deleteFriend(idUser,idAborrar) {
	var listAmigos = Meteor.users.findOne({_id: idUser});
	listAmigos = listAmigos.amigos;
	listAmigos = _.reject(listAmigos, function(friend){ return friend == idAborrar; });
	Meteor.users.update({_id: idUser}, {$set: {amigos: listAmigos}});
}

//////// JUEGOS ////////

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
	'keydown input#match_creator':function(event){
		if(event.which==13){
			if(!Partidas.findOne({name : $("#match_creator").val()})){
				if ($("#match_creator").val()!=''){
					Partidas.insert({
						name: $("#match_creator").val(),
						game_id: Session.get("game_id"),
						created: new Date(),
						initiated: false,
						finish: false,
						admin_by: Meteor.userId()
					});

					var current_match_id = Partidas.findOne({name: $("#match_creator").val()})._id;
					Session.set('match_id', current_match_id);
					$('#matches').hide();
					$('#roomcontainer').fadeIn();
					if (Games.findOne({_id : Session.get("game_id")}).name=="Alien_Invasion")
						$('#aliencontainer').show();
					else if (Games.findOne({_id :Session.get("game_id")}).name=="Froot_Wars")
						$('#frootwarscontainer').show();
					Partidas.update({_id : Session.get('match_id')},{$push: {jugadores: Meteor.userId()},$inc:{num_players :1}});
					$("#match_creator").val('');
				};
			} else {
				alert("Ya existe una partida con ese nombre. Pruebe con otro.");
			};
		};
	},
	// Entramos en una partida
	'click a.linkmatch':function(event){
		var lim = Games.findOne({_id : $(this)[0].game_id}).players_max;
		var no_limit = Partidas.findOne({_id : $(this)[0]._id}).num_players < lim;
		var players_array = Partidas.findOne({_id : $(this)[0]._id}).jugadores;
		var already_into = players_array.indexOf(Meteor.userId()) != -1;
		if(no_limit || already_into){
			Session.set('match_id', $(this)[0]._id);
			$('#matches').hide();
			$('#roomcontainer').fadeIn();
			$('#empezarboton').hide();
			console.log('AAA');
			if(Partidas.findOne({_id : Session.get('match_id')}).admin_by == Meteor.userId()){
				console.log('BBB');
				$('#empezarboton').show();
			};

			if (Games.findOne({_id : Session.get('game_id')}).name=="Alien_Invasion")
				$('#aliencontainer').show();
			else if (Games.findOne({_id : Session.get('game_id')}).name=="Froot_Wars")
				$('#frootwarscontainer').show();
			if(!already_into){
				Partidas.update({_id : Session.get('match_id')}, {$push: {jugadores: Meteor.userId()},$inc: {num_players: 1}});
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
		}

		Session.set('match_id', undefined);
		$('#roomcontainer').hide();
		$('#aliencontainer').hide();
		$('#frootwars').hide();
		$('#matches').fadeIn();
	}
};


// Pone la partida en "empezada"
Template.roomplayerstemp.events = {
	'click #EmpezarCarca' : function(event){
				if(Partidas.findOne({_id : Session.get('match_id')}).admin_by == Meteor.userId()){
					$('#empezarboton').hide();	
					Partidas.update({_id: Session.get('match_id')}, {$set: {initiated: 'true'}});
				};
	}
};

//Configuracion cuentas
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
