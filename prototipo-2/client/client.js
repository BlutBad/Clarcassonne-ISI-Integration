//Muestro la pantalla inicial en funcion de si se ha logeado
Meteor.startup(function () {
	if(Meteor.userId()){
			$('#container').children().hide();
			$('#container #tabs').fadeIn();
	} else {
			$('#container').children().hide();
			$('#slider').fadeIn();
	}
});

//Cargo el efecto slider
$(document).ready(function() {
		$('#coin-slider').coinslider({ width: 800, height:400 });
});

//Ordena los amigos alfabeticamente
Template.userstemp.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
}

//Encuentra usuarios conectados
Template.loguserstemp.conectados = function(){
	return Meteor.users.find({"services.resume.loginTokens" : {$not : []}});
}

//Subscripcion a lista de usuarios
var usersLoaded = false;
Meteor.subscribe("users", function () {
	usersLoaded = true;
});

//Subscripcion a lista de mensajes
Meteor.subscribe("messages");

//Subscripcion a lista de juegos
Meteor.subscribe("juegos");

//Cambios reactivos de la interfaz
Deps.autorun(function () {
	
	//Carga mensajes del chat
	Template.messages.messages=function(){
		return Messages.find();
	}

	//Cambio lo que se muestra en la interfaz en funcion de la sesion
	if(Meteor.userId()){
		$('#container').children().hide();
		$('#container #tabs').fadeIn();

	}else{
		$('#container').children().hide();
		$('#slider').fadeIn();
	}

});

//Cargo el sistema de pestañas de jqueryui
$(function() {
	$('#tabs').tabs();
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
					time: Date.now()
				 });
				message.val(''); //dejamos la caja de texto vacia
			}
		}	
	}
}

//Configuracion cuentas
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
