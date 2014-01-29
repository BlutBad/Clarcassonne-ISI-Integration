//Para buscar y añadir usuarios, esta detecta cuando se escribe en el formulario
Template.friendsTemp.events = {
	'keydown input#formSearch':function(event){
		if(event.which==13){
			if ($("#formSearch").val()!=''){
				searchUsers($("#formSearch").val());
			}
		}
	},'click button#buttonSearch': function (event) { //añade o borra con con enter
			if ($("#formSearch").val()!=''){
				searchUsers($("#formSearch").val());
			}
		}
}


//busca y te da opcion a agregar si no es tu amigo. si ya es amigo o ya existe o eres tu no te deja o te deja borrar
//en caso de que sea ya amigo
function searchUsers(user) {

	$("#formSearch").prop('value', '');
	
	var player = Meteor.users.findOne({username: user});
	
	
	if(player != undefined){
		if(Meteor.userId()!=player._id){
			if(isInside(Meteor.userId(), player.bloqueados) ){
				$.ambiance({message: "You are blocked by " + user, type: "error", fade: false});
			}else if(isInside(player._id, Meteor.user().bloqueados) ){
				unbloking(user,player._id);
			}else if (!isInside(player._id, Meteor.user().amigos)){
				addingFriend(user,player._id);
			}else{
				rmingFriend(user,player._id);
			}
		}else{
			$.ambiance({message: "You are " + user, type: "error", fade: false});
		}
	}else {
		$.ambiance({message: "User: " +user+ " not found!", type: "error", fade: false});
	}
}


//comprueba si la persona que te quiere agregar es amigo
function isInside (id, arry) {
	if (arry == undefined){
		return false;
	}
	
	var encontrado = false;
	arry.forEach(function(amigo) {
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
		.attr('id', 'AddButtFriend').addClass("btn btn-primary").html("Aceptar");
	$.ambiance({message: button, type: "success", title: "Add: "+user+" ?", timeout:3});
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
	$.ambiance({message: button, type: "error", title: user+ " is already your friend!", timeout:3});
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


///////////////////////////////Manager de menu amigos//////////////////////////////////
menuAmigosFunc = function (){
	$(".menuAmigos").menu();
	$(".ui-menu-icon").remove();

	$(".menuAInv").click(function() {
		menuAmInv(this);
		
	});

	$(".menuAPer").click(function() {
		menuAmPer(this);	
	});

	$(".menuABloq").click(function() {
		menuAmBloq(this);	
	});
}

/////////////////////////////////INVITACIONES///////////////////////////////////////////////////////


function menuAmInv(esto) {
	var partida = Partidas.findOne({_id : Session.get('match_id')});
	

	if (partida == undefined){
		$.ambiance({message: "You are not in a match!", type: "error", fade: false});
	}else{
		var game_current = Games.findOne({_id : partida.game_id});
		var no_limit = partida.num_players <= partida.players_max;
		var userIddestino = Meteor.users.findOne({_id: $(esto).attr("hreflang")});
		var foundUser = false;
		partida.jugadores.forEach(function(playersito_id) {
						
			if(userIddestino._id == playersito_id.user_id){
				foundUser = true;
			}
		});
		if(foundUser){
			$.ambiance({message: "user: "+userIddestino.username+" is already in", type: "error", fade: false});
		}else if(partida.initiated){
			$.ambiance({message: "Match is already initiated", type: "error", fade: false});
		}else if( game_current.name != "Clarcassonne" ){
			$.ambiance({message: "This is a single player game!", type: "error", fade: false});
		}else if(partida.admin_by != Meteor.userId()){
			$.ambiance({message: "You are not the admin", type: "error", fade: false});
		}else if(!no_limit){
			$.ambiance({message: "Partida llena", type: "error", fade: false});
		}else{
			var invitacion = Invitations.find().fetch();
			var sentInv = false;
			invitacion.forEach(function(inv) {			
				if(inv.match_id == partida._id && inv.dest==userIddestino._id){
					sentInv = true;
				}
			});
			if (!sentInv){
				Invitations.insert({
					match_id: partida._id,
					game_id:game_current._id,
					orig: Meteor.user()._id,
					dest: userIddestino._id,
					sent: 0,
					when: new Date()
				});
			
				$.ambiance({message: "Invitation sent to " + userIddestino.username,type: "success"});
			

			}else {
				$.ambiance({message: userIddestino.username+ " has already invited" ,type: "success"});
			}
		}
	}
}

Deps.autorun(function () {
	if(Meteor.user()){
		var invitaciones = Invitations.find().fetch();
		if (invitaciones != undefined && invitaciones.length >0){			
			invitaciones.forEach(function(inv) {			
				if(inv.dest == Meteor.user()._id && inv.sent==0){
					$(".ambiance").remove();
					managerInvitations(inv);
				}
			});
		}
	}
});
//hechas:
//que la partida actual no esté iniciada
//rellenar bien el ambiance de llegada con nombre de partida, Juego, quien te invita... boton aceptar
//que no este el receptor en una partida
//poner invitacion sent a true
//Quiero que se queden fijas.timeout 0; cuando le des a aceptar se borre.
//llamar a la funcion de joinmatch 

//no hechas:
//caso en el que invite y me salga de la partida xD

function managerInvitations(inv){
	var usernameOrig = Meteor.users.findOne({_id: inv.orig});
	var button = $(window.document.createElement('button'))
		.attr('id', 'AddButtLinkMatch').addClass("btn btn-primary").html("Aceptar");
	
	$.ambiance({message: button ,title: usernameOrig.username+" has invited you to play Carcassonne",type: "success", timeout: 0});
	Session.set('game_id', inv.game_id);
	$("#AddButtLinkMatch").click(function() {		
		AceptarInvitacion(inv);
	});
}

function AceptarInvitacion(inv,usernameOrig){
	if(Session.get('match_id')){
		$.ambiance({message: "Close current game to join", type: "error", fade: false});
	}else{
		$("#ui-id-1").trigger('click');
		$("a[tipo='Clarcassonne']").trigger('click');
		if(Meteor.user().birthday){
			Invitations.update({_id: inv._id}, {$set: {sent: 1}});			
			$(".ambiance").remove();
			joinmatch(inv.match_id, false, true);
		}else{
			$.ambiance({message: "Fill in your birthday first", type: "error", fade: false});
			$( "#dialog_birthdate" ).dialog("open");
			$("#error_birthdialog").remove();
		}
	}
}

/////////////////////////////////Bloqueo///////////////////////////////////////////////////////

function menuAmBloq(esto) {
	
	var idblk = Meteor.users.findOne({_id: $(esto).attr("hreflang")});
	deleteFriend(idblk._id,Meteor.userId());
	deleteFriend(Meteor.userId(),idblk._id);
	Meteor.users.update({_id: Meteor.userId()}, {$push: {bloqueados: idblk._id}});
	$.ambiance({message: idblk.username+ " blocked and removed of friends" ,type: "success"});
}

function unbloking(user,id) {
	var button = $(window.document.createElement('button'))
		.attr('id', 'AddButtUnblk').addClass("btn btn-primary").html("Aceptar");
	$.ambiance({message: button, type: "success", title: "Unblocking and adding to friends "+user+" ?", timeout:3});
	$("#AddButtUnblk").click(function() {	
		UnblockFriend(Meteor.userId(),id);
		Meteor.users.update({_id: Meteor.userId()}, {$push: {amigos: id}});
		Meteor.users.update({_id: id}, {$push: {amigos: Meteor.userId()}});
		$.ambiance({message: "You and "+user+" are now friends!", title: "Success!",type: "success"});
	});
}

function UnblockFriend(idUser,idAborrar) {
	var listBlk = Meteor.user().bloqueados;
	listBlk = _.reject(listBlk, function(friend){ return friend == idAborrar; });
	Meteor.users.update({_id: idUser}, {$set: {bloqueados: listBlk}});
}

/////////////////////////////////Ver Perfil///////////////////////////////////////////////////////

function menuAmPer(esto) {
	
	//alert($(esto).attr("hreflang"));
	var idblk = Meteor.users.findOne({_id: $(esto).attr("hreflang")});
	$("#ui-id-3").trigger('click');
	$("#usersearcher").prop('value', idblk.username);
	$("#userSearch").trigger('click');
}



