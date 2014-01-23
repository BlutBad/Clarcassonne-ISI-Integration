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


/////////////////////////////////INVITACIONES///////////////////////////////////////////////////////





menuAmigosFunc = function (){
	$(".menuAmigos").menu();
	$(".ui-menu-icon").remove();

	$(".menuAInv").click(function() {
		menuAmInv(this);
	});

	$(".menuAPer").click(function() {
		alert("caca");	
	});

	$(".menuABloq").click(function() {
		alert("caca");	
	});
}



function menuAmInv(esto) {
	var partida = Partidas.findOne({_id : Session.get('match_id')});
	if (partida == undefined){
		$.ambiance({message: "You are not in a match!", type: "error", fade: false});
	}else if( Games.findOne({_id : partida.game_id}).name != "Clarcassonne" ){
		$.ambiance({message: "This is a single player game!", type: "error", fade: false});
	}else if(partida.admin_by != Meteor.userId()){
		$.ambiance({message: "You are not the admin", type: "error", fade: false});
	}else{
		var invitacion = Invitations.findOne({match_id : partida._id});
		if (invitacion == undefined){
			Invitations.insert({
				match_id: partida._id,
				requester: Meteor.user().username,
				owner: $(esto).attr("hreflang"),
				sent: false,
				when: new Date()
			});
			
			console.log(Invitations.find())
			
			$.ambiance({message: "Invitation sent to " + $(esto).attr("hreflang"),type: "success"});

			//var invi_match_id = Invitations.findOne({match_id : partida._id})._id;
			//console.log(invi_match_id);
			//Session.set('invit_id', invi_match_id);
			//Invitations.update({_id: invi_match_id}, {$set: {sent: 'true'}});
		}else {
			$.ambiance({message: $(esto).attr("hreflang")+ " has already invited" ,type: "success"});
		}
	}
}

//problema: que este jugando a otro juego.
// incluso que este en la pestaña de ranking.
//Quiero que se queden fijas

Deps.autorun(function () {
	if (Meteor.user()){
		var invitaciones = Invitations.find();
		console.log("AAAAAAAAAAAAAA")
		//var invitacion = Invitations.findOne({requester : Meteor.user().username});
		//var pene = invitacion.sent;
		//alert("caca");
		//$.ambiance({message: "Invitation sent to "+invitacion.match_id ,type: "success", timeout: 0});
	}	
});




