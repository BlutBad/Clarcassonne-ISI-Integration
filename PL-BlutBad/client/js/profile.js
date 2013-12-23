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
		datebirth=$("#datebirth").val();
		genero=$("#genero").val();
		console.log(email);
		Meteor.users.update(id, {
		    $set : {
				"profile.datebirth" : datebirth,
				"profile.genero" : genero,
		    }
		});
	}
});



Template.profil.scores=function(){
	rankings = Ranking.find({user_id: Meteor.user()._id});
	console.log("here");
	scores = [];
	rankings.forEach(function(each,index) { 
		console.log("here this is");
		sco = {};   
		sco.No = index+1;
		sco.win=each.winTimes;
		sco.lose=each.loseTimes;
		sco.total=each.timesPlayed;
		sco.totalScore = each.totalScore;
		sco.game = Juegos.findOne({_id: each.game_id}).name;

		scores.push(sco);
	});  
	return scores; 
};
/*Ranking.insert({
gameId : gameId,
userId : this.userId,
score : score
game_id" : "CoSMnvGLztupC8k5s
});*/

