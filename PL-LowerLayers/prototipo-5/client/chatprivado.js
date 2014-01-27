
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
			Meteor.defer(function () {
				menuAmigosFunc();
  			});

			return Meteor.users.find({$and: [{_id: {$in: amigos}},{"services.resume.loginTokens" :  []}]});
		}	
	}	
}		
//Pinta mensajes privados
Template.privatemessagestemp.listaprivatemessages=function(){
	var privatemessages=Private_Messages.find({$or: [ {$and:[{orig_id: Session.get('orig_id')},{dest_id:Session.get('dest_id')}]} , {$and:[{orig_id:Session.get('dest_id')},{dest_id: Session.get('orig_id')}]}  ] },{sort: {date:-1}, limit:20 });
	var listprivatemessages=[];
	privatemessages.forEach(function(elem){
		var userorig = Meteor.users.findOne({_id: elem.orig_id});
		listprivatemessages.push({"date":elem.date,"orig_id":userorig.username,"texto":elem.texto });
	});
	return listprivatemessages;	
}



//Detecta cuando llega un mensaje privado nuevo a la base de datos siendo el usuario registrado destino
Deps.autorun(function () {
	if (Meteor.user()){
		var newprivatemessages = Private_Messages.find({$and: [{dest_id: Meteor.userId()},{recibido: 0}] });
		newprivatemessages.forEach(function(newprivatemessage){
			usernameprivatemessage=Meteor.users.findOne({_id: newprivatemessage.orig_id}).username;
			Private_Messages.update({_id: newprivatemessage._id}, {$set: {recibido: 1}});
			var chatabiertodeorig = $("div[tipo='contenidochat'][id='"+newprivatemessage.orig_id+"_contenido']");
			if (chatabiertodeorig.css("display")!="block")
				$.ambiance({message: "New private message received from "+usernameprivatemessage, fade: true, timeout: 4});			
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
			$("#chatTabs ul").append("<li id='"+userdest_id+"'> <a tipo='titulochat' href='#"+userdest_id+"_contenido'>"+userdest.username+"</a><button type='button' class='closechattab'>x</button></li>");
			$("#chatTabs").append("<div tipo='contenidochat' id='"+userdest_id+"_contenido'></br></div>");
			

			$("#"+userdest_id+"_contenido").append("<input type='text' style='float:right; font-size: 12pt; width:100%;' maxlength='125' class='privatemessagecont'/> <br style='clear:both;'/>");


			$("#"+userdest_id+"_contenido").append(PlantillaMensajesPrivados);	


			$("#"+userdest_id+"_contenido").append("<div style='width:15%; height:10% ; text-align:center; float:left; '>"+
												"<div style=' '>"+Meteor.user().username+"</div>"+
												"<img width='75px' style='' height='75px' src='"+Meteor.user().avatar+"'>"+
											"</div>");

			



			$("#"+userdest_id+"_contenido").append("<div style='width:15%; height:10% ; text-align:center; float:left;'>"+
												"<div style=''>"+userdest.username+"</div>"+
												"<img width='75px' style='' height='75px' src='"+userdest.avatar+"'>"+
											"</div>");
			

							
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
	Session.set("orig_id",Meteor.userId());
	Session.set("dest_id",userdest_id);
});



//Si hago click en la cruz de la pestaña se cierra ésta y se elimina del array
//la conversacion. Si no quedan conversaciones se oculta la plantilla
$(document).on("click", ".closechattab", function() {
        var userdest_id=($(this).parent().attr("id"));
        var indice=mychats.indexOf(userdest_id);
        var userdest=Meteor.users.findOne({_id: userdest_id});

        mychats.splice(indice,1);

		$("#"+userdest_id).remove();
		$("#"+userdest_id+"_contenido").remove();

		if (mychats.length==0){
			$("#chatTabs").hide();
		}else{
			var chatabierto = $("div[tipo='contenidochat'][style='display: block;']").attr("id");
			if (chatabierto != undefined){
				Session.set("orig_id",Meteor.userId());
				Session.set("dest_id",chatabierto.split("_")[0]);
			}
		}	
});








//Escucha pulsaciones de tecla en el input text del chat privado
$(document).on("keydown",".privatemessagecont", function(event){
	if ( event.which == 13 ) {
		var privatemessage = $(this);
		if (privatemessage.val()!=''){
			Private_Messages.insert({
				orig_id: Session.get('orig_id'),
				dest_id: Session.get('dest_id'),
				texto: privatemessage.val(),
				date: (new Date()).toUTCString().split(" GMT")[0],
				recibido: 0
			});
			privatemessage.val(''); //dejamos la caja de texto vacia
		}
	}
});
