Template.comunidad.show = function() {
  return Session.get('current_stage') == 'Tienda';
};

Template.comunidad.registrado=function(){
	if (Meteor.user()) {
		return true;
	}else{
		return false;
	}

};

Template.comunidad.total=function(){
	//el total de puntuacion lo metere en el perfil de usuaio para que sea mas facil despues saber cuantos puntos les quedan para poder cambiarlos por isicoins
	rankings = Ranking.find({userId: Meteor.user()._id});
	console.log("here");
	scores = [];
	total=0;
	rankings.forEach(function(each,index) { 
		sco = {};   
		sco.game = Juegos.findOne({_id: each.gameId}).name;
		sco.totalScore = each.totalScore;
		total=total+sco.totalScore;
		console.log(sco.totalScore);
	});  
	return total; 
};

Template.comunidad.isicoins=function(){
	id=Meteor.user()._id;
	if (Meteor.users.findOne({_id: id}).profile.isicoins!=' '){
		isicoins=Meteor.users.findOne({_id: id}).profile.isicoins;
		return isicoins;
	}else{
		return 0;
	};
};

Template.comunidad.events = {
	'click input#change': function() {
		console.log("cambiar");
		id=Meteor.user()._id;
		isicoins=Meteor.users.findOne({_id: id}).profile.isicoins;
		isi=isicoins+1
		Meteor.users.update(id, {
		    $set : {
				"profile.isicoins" : isi,
			}
		});
	}
}; 