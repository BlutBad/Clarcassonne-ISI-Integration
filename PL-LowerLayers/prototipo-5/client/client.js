
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
	$('#bygameranking').hide();
	$('#byuserranking').hide();
	$('#byusergameranking').hide();
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

var usersLoaded = false;
Meteor.subscribe("users", function () { 
	usersLoaded = true;
});

Meteor.users.find().observe({
	added: function(user) { 
		if (usersLoaded) { 
			Meteor.defer(function () {
				if((user.avatar == undefined) && (user._id == Meteor.user()._id)){
					Meteor.call("definirAvatar","Avatares/0.jpg",function(error,result){console.log(error);console.log(result);})
				}
  			});
			
		}
	}
});

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

//Subscripcion selectiva a invitaciones
Deps.autorun(function () {
	var current_inv_sent = Session.get("isSentInv")
	//alert(current_inv_sent)
	Meteor.subscribe("invitations",current_inv_sent);
});

//Subscripción selectiva a los mensajes de la sala
Deps.autorun(function () {
	var current_match_id = Session.get("match_id")
	Meteor.subscribe("messages", current_match_id);
});

//Subscripción selectiva a ranking
Deps.autorun(function () {
	var selected_game_id = Session.get("game_id_ranking");
	var selected_user_id = Session.get("user_id_ranking");
	Meteor.subscribe("ranking", selected_game_id, selected_user_id);
});



/////////////RELLENO DE PLANTILLAS//////////

//Encuentra juegos
Template.gamestemp.games=function(){
	return Games.find();
}

//Carga mensajes del chat
Template.messagestemp.messages=function(){
	return Messages.find();
}
//Encuentra usuarios conectados
Template.loguserstemp.logusers = function(){
	return Meteor.users.find({"services.resume.loginTokens" : {$not : []}});
}

Template.iconLoginTemp.avatar = function(){
	if(Meteor.user()){
		return Meteor.user().avatar;
	}
}





//Configuracion cuentas
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
