//Muestro la pantalla inicial en funcion de si se ha logeado
Meteor.startup(function () {
	if(Meteor.userId()){
			$('#container').children().hide();
			$('#container #tabs').fadeIn();
			$('#container #chatTabs').fadeIn();
			$('#friends').fadeIn();
	} else {
			$('#container').children().hide();
			$('#slider').fadeIn();
	}
	$('#matches').hide();
	$('#roomcontainer').hide();
	$('#aliencontainer').hide();
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
		
		$("#friends").css("top",$(window).height()-57);
		$("#friends").css("left",$(window).width()-181);
		$("#accordion").css("top",10);
		$("#accordion").css("left",$(window).width()-183);
		$("#tabs").css("width",$(window).width()-200);
		$("#chatTabs").css("width",$(window).width()-200);
		$("#chatTabs").css("top",$(window).height()-148);


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

//Ordena los amigos alfabeticamente
Template.userstemp.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
}

//Encuentra usuarios conectados
Template.loguserstemp.logusers = function(){
	return Meteor.users.find({"services.resume.loginTokens" : {$not : []}});
}

//Encuentra juegos
Template.gamestemp.games=function(){
	return Games.find();
}

//Encuentra partidas
Template.matchestemp.matches = function(){
	return Matches.find();
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
	Meteor.subscribe("matches", current_game_id);
});

//Subscripción selectiva a los mensajes de la sala
Deps.autorun(function () {
	var current_match_id = Session.get("match_id")
	Meteor.subscribe("messages", current_match_id);
});

//Subscripción a la lista de jugadores en partidas
Deps.autorun(function () {
	Meteor.subscribe("plays");
});


//Cambios reactivos de la interfaz
Deps.autorun(function () {

	//Cambio lo que se muestra en la interfaz en funcion de la sesion
	if(Meteor.userId()){
		$('#container').children().hide();
		$('#container #tabs').fadeIn();
		$('#container #chatTabs').fadeIn();
		$('#friends').fadeIn();
	}else{
		$('#container').children().hide();
		$('#slider').fadeIn();
	}
});










//Inserta mensajes del chat
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








//Para buscar y añadir usuarios
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

function deleteFriend(idUser,idAborrar) {
	var listAmigos = Meteor.users.findOne({_id: idUser});
	listAmigos = listAmigos.amigos;
	listAmigos = _.reject(listAmigos, function(friend){ return friend == idAborrar; });
	Meteor.users.update({_id: idUser}, {$set: {amigos: listAmigos}});
}

// Abrimos sesión en uno de los juegos
Template.gamestemp.events = {
	'click a.linkgame':function(event){
		Session.set('game_id', $(this)[0]._id);
		$('#games').hide();
		$('#matches').fadeIn();
	}
}











Template.matchestemp.events = {
	// Creamos una partida nueva en la base de datos
	'keydown input#match_creator':function(event){
		if(event.which==13){
			if ($("#match_creator").val()!=''){
				Matches.insert({
					name: $("#match_creator").val(),
					game_id: Session.get("game_id"),
					created: new Date()
				});
				$("#match_creator").val('');
			}
		}
	},
	// Entramos en una partida
	'click a.linkmatch':function(event){
		var lim = Games.findOne({_id : $(this)[0].game_id}).players_max
		if(Plays.find({match_id : $(this)[0]._id}).count() < lim){
			Session.set('match_id', $(this)[0]._id);
			$('#matches').hide();
			$('#roomcontainer').fadeIn();
			if (Games.findOne({_id : $(this)[0].game_id}).name=="Alien_Invasion")
				$('#aliencontainer').show()
			Plays.insert({match_id : Session.get('match_id'), user_id : Meteor.userId(), score : 0});
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
		Session.set('match_id', undefined);
		$('#roomcontainer').hide();
		$('#aliencontainer').hide();
		$('#matches').fadeIn();
		console.log(Session.get('match_id'));
	}
};











//Configuracion cuentas
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
