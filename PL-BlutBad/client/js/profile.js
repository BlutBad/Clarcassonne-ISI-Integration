Template.profil.showprofile = function() { 
	//name= Meteor.user().profile.name;
	//username= Meteor.user().username;
	if (Meteor.user()){
	}
	return Session.get('current_stage') == 'Mi perfil';
};

Template.profil.registrado=function(){
	if (Meteor.user()) {
		return true;
	}else{
		return false;
	}

};

Template.profil.events({
	'click #datebirth': function(){
		$(function() {
			$("#datebirth").datepicker({
				showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: true,
				dateFormat: 'dd/mm/yy', 
				changeMonth: true, 
				changeYear: true, 
				yearRange: '-100:+0'
			});
		});
	},

	'click #save': function(){
		console.log("guardar");
		console.log(Meteor.user()._id);
		id=Meteor.user()._id;
		username=$("#nombre").val();
		email=$("#email").val();
		//datebirth=$("#datebirth").val();
		genero=$("#genero").val();
		console.log(email);
		Meteor.users.update(id, {
		    $set : {
				"profile.name" : username,
				"profile.email" : email,
		//		"profile.datebirth" : datebirth,
				"profile.genero" : genero,
		    }
		});

	}
});

Template.profil.scores=function(){
	rankings = Ranking.find({userId: Meteor.user()._id});
	//console.log("here");
	scores = [];
	rankings.forEach(function(each,index) { 
		sco = {};   
		sco.No = index+1;
		sco.game = Juegos.findOne({_id: each.gameId}).name;
		sco.user = Meteor.users.findOne({_id: each.userId}).username;
		sco.maxScore = each.maxScore;
		sco.totalScore = each.totalScore;
		sco.rango = Rangos.findOne({_id: each.rango_id}).rango;
		scores.push(sco);
	});  
	return scores; 
};
/*Ranking.insert({
gameId : gameId,
userId : this.userId,
score : score
});*/
