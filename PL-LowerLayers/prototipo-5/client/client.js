
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

		$(document).on("click","#buttVideoSt",function() {
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
		$( "#formSearch" ).autocomplete({
			source: availableNames
		});

		$(document).on("click","#formplayer",function(){
			$( "#formplayer" ).autocomplete({
				source: availableNames
			});
		});
		$(document).on("click","#formplayergame",function(){
			$( "#formplayergame" ).autocomplete({
				source: availableNames
			});
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
		Meteor.subscribe("private_messages", Meteor.userId());
});

//Subscripcion selectiva a invitaciones
Meteor.subscribe("invitations");


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
	return Messages.find({},{sort: {time:-1}});
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





var obsceneswords = ["fuck","fucking","asshole","bitch","pussy","cock","blowjob","handjob","shit","hostias",
					"coño","coños","coñete","chocho","chochete","cabron","cabrona","gilipollas","puta","putas",
					"puto","putos","puton","polla","poya","pollas","pollazo","capulla","mamon","mamona","mamones","maricon",
					"maricona","maricones","follar","follando","follen","jodan","jodete","cago","cojon","cojones","bukkake",
					"bucake","gayola","gallola","verga","berga","pinga","gilipoyas","mamada","mamadas"];
//Sustituye palabras obscenas por cuatro asteriscos
moderator = function (message){
	var moderatedwordslist = new Array();
	wordslist=message.split(" ");
	wordslist.forEach(function(word){
		if (obsceneswords.indexOf(word) != -1){
			var moderatedword="****";
		}else{
			var moderatedword=word;
		}
		moderatedwordslist.push(moderatedword);
	})
	return moderatedwordslist.join(" ")
}



availableNames = new Array();

Deps.autorun(function(){
	if(Meteor.users.find().count()){
		listaUsuarios=Meteor.users.find();
		listaUsuarios.forEach(function(elem){
			if (availableNames.indexOf(elem.username)==-1)
				availableNames.push(elem.username);
		});
	}
});



//Configuracion cuentas
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});


 
