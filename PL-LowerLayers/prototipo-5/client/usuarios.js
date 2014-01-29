


$(function(){
	$( "#usersearcher" ).autocomplete({
		source: availableNames
	});
});







$(document).on("click","#userSearch",function(){
	$("#userperfil").remove();
	var esamigo=0;
	var usernamefound=$("#usersearcher").val();
	var userfound=Meteor.users.findOne({username: usernamefound})
	if (userfound != undefined){
		if (userfound._id==Meteor.userId()){
			$("a[href='#perfil']").trigger('click');
		}else{
			Session.set("IdPerfil",userfound._id);
			Session.set("IdPerfilBackUp",userfound._id)
			if (Meteor.user().amigos != undefined){
				if (Meteor.user().amigos.indexOf(userfound._id)!=-1)
					esamigo=1;
			}
			var perfiluser = Meteor.render(function () {
				return Template.userperfiltemp({esamigo: esamigo});
			});	
			$("#usuarios").append(perfiluser);	
		}	
	}else{
		$("#dialog_nouser").dialog("open");
	}	

});




Deps.autorun(function(){
	var userIdPerfil=Session.get("IdPerfil");
	Meteor.subscribe("ranking",undefined,userIdPerfil);
});


$(document).on("click","a[href='#usuarios']",function(){
	if ($("#userperfil").length){
		Session.set("IdPerfil",Session.get("IdPerfilBackUp"));
	}	
});




Template.userperfiltemp.userfind = function () {
	return  Meteor.users.findOne({_id:Session.get("IdPerfilBackUp")})
};



Template.userperfiltemp.amigos = function () {
	var listaAmigosUserFound=[];
	var nombresAmigos=[];
	var userfound=Meteor.users.findOne({_id:Session.get("IdPerfilBackUp")})
	if (userfound!=undefined){
		(userfound.amigos).forEach(function(id_amigo){
			var amigo=Meteor.users.findOne({_id: id_amigo});
			nombresAmigos.push(amigo.username);
		});
		if (nombresAmigos.length != 0)
			listaAmigosUserFound=nombresAmigos.join(", ");
	}	
	return listaAmigosUserFound;
};

Template.userperfiltemp.profitslist = function () {
	var listgames = Games.find({});
	var profitslist=[];
	listgames.forEach(function(game){
		if (game.profits!=undefined){
			(game.profits).forEach(function(profit){
				if ( (profit.users).indexOf(Session.get("IdPerfilBackUp"))!=-1)
					profitslist.push({"game":game.name,"title":profit.title});
			});			
		}
	});
	return profitslist;

};

Template.userperfiltemp.rank = function(){
	if(Ranking.find().count()!=0){
		var listelems = Ranking.find({"user_id": Session.get("IdPerfil")});
		var elemfound = false;
		var listbestelems = [];
		var listbestscores=[];
		listelems.forEach(function(elem){
			elemfound = false;
			for(var i=0;i<listbestelems.length;i++){
				if (listbestelems[i].game_id==elem.game_id){
					elemfound=true;
					if(listbestelems[i].score<elem.score)
						listbestelems[i].score=elem.score;
				}		
			}; 
			if (elemfound==false)
				listbestelems.push(elem);
		});
		
		listbestelems.forEach(function(bestelem){
			listbestscores.push({"game": Games.findOne({_id:bestelem.game_id}).name,"points": bestelem.score});
		});

		return listbestscores;
	}
};
