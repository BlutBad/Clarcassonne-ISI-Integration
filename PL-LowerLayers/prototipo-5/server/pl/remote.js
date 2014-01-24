
Meteor.methods({
	definirAvatar: function (pathAvatar){
		var user=Meteor.users.findOne({_id:this.userId});
		Meteor.users.update({_id: this.userId},{$set: {avatar:pathAvatar}});
		return "Actualizado avatar";
	},
	definirFecha: function (fechanacimiento){
		var user=Meteor.users.findOne({_id:this.userId});
		Meteor.users.update({_id: this.userId},{$set: {birthday:fechanacimiento}});
		return "Actualizada fecha de nacimiento";
	},
	definirEmail: function (email){
		var user=Meteor.users.findOne({_id:this.userId});
		Meteor.users.update({_id: this.userId},{$set: {address:email}});
		return "Actualizado correo electronico";
	},
	//Puntuacion alien y frootwars 
	matchFinish: function (match_id, game_id, points) {
    	Partidas.update({_id: match_id},{$set: {finish:"true", time_end:Date.now()}});
        Ranking.insert({user_id: this.userId, game_id: game_id, score: points});
        //if (Ranking.find({game_id: game_id, user_id:this.userId}).count()==6){
        		var list = Ranking.find({game_id: game_id, user_id:this.userId},{sort:{score:1}}).fetch();
        		var lastuser = list[0];
        		console.log(lastuser);
        //}		
    }
});
