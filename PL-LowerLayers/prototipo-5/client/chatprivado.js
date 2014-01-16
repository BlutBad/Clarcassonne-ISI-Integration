
//Pinta lista de amigos conectados
Template.listaAmigosOnlineTemp.listaAmigosOnline = function(){
	if (Meteor.user()){
		if (Meteor.user().amigos!=undefined){
			amigos=Meteor.user().amigos;
			return Meteor.users.find({$and: [{_id: {$in: amigos}},{"services.resume.loginTokens" : {$not : []}}]});
		}	
	}	
}		
//Pinta lista de amigos desconectados
Template.listaAmigosOfflineTemp.listaAmigosOffline = function(){
	if (Meteor.user()){
		if (Meteor.user().amigos!=undefined){
			amigos=Meteor.user().amigos;
			return Meteor.users.find({$and: [{_id: {$in: amigos}},{"services.resume.loginTokens" :  []}]});
		}	
	}	
}		
//Pinta mensajes privados
Template.privatemessagestemp.listaprivatemessages=function(){
	var privatemessages=Private_Messages.find({$or: [ {$and:[{orig: Session.get('origname')},{dest:Session.get('destname')}]} , {$and:[{orig:Session.get('destname')},{dest: Session.get('origname')}]}  ] },{sort: {date:-1}, limit:20 });
	return privatemessages;	
}



//Detecta cuando llega un mensaje privado nuevo a la base de datos siendo el usuario registrado destino
Deps.autorun(function () {
	if (Meteor.user()){
		var newprivatemessages = Private_Messages.find({$and: [{dest: Meteor.user().username},{recibido: 0}] });
		console.log("recv")
		newprivatemessages.forEach(function(newprivatemessage){
			Private_Messages.update({_id: newprivatemessage._id}, {$set: {recibido: 1}});
			console.log(newprivatemessage.orig)
			var chatabiertodeorig = $("div[tipo='contenidochat'][id='"+newprivatemessage.orig+"']");
			if (chatabiertodeorig.css("display")!="block"){
				$.ambiance({message: "New private message received from "+newprivatemessage.orig, fade: true, timeout: 4});
				console.log("notif")
			}			
		});
	}	
});



var mychats = new Array();
//Cada vez que hago click en un amigo conectado se inserta una pestaña de chat
//y se añade a un array el id del usuario clickeado para saber las conversaciones
//activas y no abrirlas de nuevo si lo estan. Se muestra la plantilla.
//En un futuro la llegada de un mensaje desde otro usuario habra que asociarla
//al mismo evento de insertar ventana y modificar el array.
Template.listaAmigosOnlineTemp.events = {
	'click a.linkchat':function(event){
		var userdest_id = $(this)[0]._id;
		var indice=mychats.indexOf(userdest_id);
		var userdest=Meteor.users.findOne({_id: userdest_id});
		var PlantillaMensajesPrivados = Meteor.render(function () {
			return Template.privatemessagestemp();
		});
		
		if (indice==-1){
			mychats.push(userdest_id);
			$("#chatTabs ul").append("<li id='"+userdest_id+"'> <a tipo='titulochat' href='#"+userdest.username+"'>"+userdest.username+"</a><button type='button' class='closechattab'>x</button></li>");
			$("#chatTabs").append("<div tipo='contenidochat' id='"+userdest.username+"'> <input type='text' size='100'  maxlength='100' style='font-size: 12pt;' class='privatemessagecont'/></br></div>");
			$("#"+userdest.username).append(PlantillaMensajesPrivados);
			$("#chatTabs").tabs("refresh");
		}

		$("#"+userdest_id+" a").trigger('click');

		if (mychats.length!=0)
			$("#chatTabs").fadeIn();		
	}
}



//Escucha evento click en el titulo de una pestaña de chat privado
$(document).on("click","a[tipo='titulochat']", function(){
	var userdest_id = $(this).parent().attr("id");
	var userdest=Meteor.users.findOne({_id: userdest_id});
	Session.set("origname",Meteor.user().username);
	Session.set("destname",userdest.username);
});



//Si hago click en la cruz de la pestaña se cierra ésta y se elimina del array
//la conversacion. Si no quedan conversaciones se oculta la plantilla
$(document).on("click", ".closechattab", function() {
        var userdest_id=($(this).parent().attr("id"));
        var indice=mychats.indexOf(userdest_id);
        var userdest=Meteor.users.findOne({_id: userdest_id});

        mychats.splice(indice,1);

		$("#"+userdest_id).remove();
		$("#"+userdest.username).remove();

		if (mychats.length==0){
			$("#chatTabs").hide();
		}else{
			var nombrechatabierto = $("div[tipo='contenidochat'][style='display: block;']").attr("id");
			if (nombrechatabierto != undefined){
				console.log("conversacion restante abierta de "+nombrechatabierto);
				Session.set("origname",Meteor.user().username);
				Session.set("destname",nombrechatabierto);
			}
		}	
});




var obsceneswords = ["fuck","fucking","asshole","bitch","shit","hostias","coño","coños","cabron",
					"cabrona","gilipollas","puta","putas","puto","putos","puton","polla","pollas","capulla",
					"mamon","mamona","mamones","maricon","maricona","maricones","follar",
					"follando","follen","jodan","jodete","cago"];
//Sustituye palabras obscenas por cuatro asteriscos
function moderator(message){
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



//Escucha pulsaciones de tecla en el input text del chat privado
$(document).on("keydown",".privatemessagecont", function(event){
	if ( event.which == 13 ) {
		var privatemessage = $(this);
		if (privatemessage.val()!=''){
			Private_Messages.insert({
				orig: Session.get('origname'),
				dest: Session.get('destname'),
				text: moderator(privatemessage.val()),
				date: new Date(),
				recibido: 0
			});
			privatemessage.val(''); //dejamos la caja de texto vacia
		}
	}
});
