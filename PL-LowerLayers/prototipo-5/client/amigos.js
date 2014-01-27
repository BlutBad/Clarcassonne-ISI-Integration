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
	}else if( Games.findOne({_id : partida.game_id}).name != "Clarcassonne" ){
		$.ambiance({message: "This is a single player game!", type: "error", fade: false});
	}else if(partida.admin_by != Meteor.userId()){
		$.ambiance({message: "You are not the admin", type: "error", fade: false});
	}else{
		var invitacion = Invitations.findOne({match_id : partida._id});
		if (invitacion == undefined){
			Invitations.insert({
				match_id: partida._id,
				orig: Meteor.user().username,
				dest: $(esto).attr("hreflang"),
				sent: 0,
				when: new Date()
			});
			
			$.ambiance({message: "Invitation sent to " + $(esto).attr("hreflang"),type: "success"});
			

		}else {
			$.ambiance({message: $(esto).attr("hreflang")+ " has already invited" ,type: "success"});
		}
	}
}

//problema: que este jugando a otro juego. pues que se salga
//Quiero que se queden fijas.timeout 0;

/*Deps.autorun(function () {
	console.log("antes de user")
	
		console.log("antes de find")
		//var invitaciones = Invitations.find().fetch();
		
		console.log(invitaciones);
		//var invitacion = Invitations.findOne({requester : Meteor.user().username});
		//var pene = invitacion.sent;
		//alert("caca");
		//$.ambiance({message: "Invitation",type: "success", timeout: 0});	
});*/

/////////////////////////////////Bloqueo///////////////////////////////////////////////////////

function menuAmBloq(esto) {
	
	var idblk = Meteor.users.findOne({username: $(esto).attr("hreflang")})._id;
	deleteFriend(idblk,Meteor.userId());
	deleteFriend(Meteor.userId(),idblk);
	Meteor.users.update({_id: Meteor.userId()}, {$push: {bloqueados: idblk}});
	$.ambiance({message: $(esto).attr("hreflang")+ " blocked and removed of friends" ,type: "success"});
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
	$("#ui-id-3").trigger('click');
	$("#usersearcher").prop('value', $(esto).attr("hreflang"));
	$("#userSearch").trigger('click');
}



