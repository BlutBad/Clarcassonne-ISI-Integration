
////////////////INICIALIZACION////////////////////////////

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

		$("#buttVideoSt").click(function() {
			if ($("#buttVideoSt").hasClass("StartVC")){
				$("#buttVideoSt").html("Stop VideoChat");
				$("#buttVideoSt").css("background-color","#DF0101");
				$("#buttVideoSt").css("border","2px solid #DF0101");
				$("#buttVideoSt").removeClass();
				var nameRoom = Partidas.findOne({_id : Session.get('match_id')}).name;
				startVideoChat(nameRoom);
			}else{
				endVideoChat()
			}	
		});

});


//Cambios reactivos de la interfaz
Deps.autorun(function () {
	if(Meteor.userId()){
		$('#container').children().hide();
		$('#container #tabs').fadeIn();
		$('#friends').fadeIn();
	}else{
		$('#container').children().hide();
		$('#slider').fadeIn();
	}
});



///////////// SUBSCRIPCIONES ////////////////

//Subscripcion a lista de usuarios
Meteor.subscribe("users");

//Subscripcion a lista de juegos
Meteor.subscribe("games");

//Subscripción selectiva a la lista de partidas
Deps.autorun(function () {
	var current_game_id = Session.get("game_id")
	Meteor.subscribe("partidas", current_game_id);
});

//Subscripcion selectiva a los mensajes privados
Deps.autorun(function () {
	if (Meteor.user())
		Meteor.subscribe("private_messages", Meteor.user().username);
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



/////////////RELLENO DE PLANTILLAS//////////

//Ordena los amigos alfabeticamente
Template.userstemp.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
}
//Encuentra juegos
Template.gamestemp.games=function(){
	return Games.find();
}
//Encuentra partidas
Template.matchestemp.matches = function(){
	return Partidas.find();
}
//Carga mensajes del chat
Template.messagestemp.messages=function(){
	return Messages.find();
}
//Encuentra usuarios conectados
Template.loguserstemp.logusers = function(){
	return Meteor.users.find({"services.resume.loginTokens" : {$not : []}});
}






//Configuracion cuentas
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
