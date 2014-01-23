
Meteor.methods({
	definirAvatar: function (pathAvatar){
		var user=Meteor.users.findOne({_id:this.userId});
		if (user.avatar==pathAvatar)
			return "Avatar no actualizado, es el mismo"
		Meteor.users.update({_id: this.userId},{$set: {avatar:pathAvatar}});
		return "Actualizado avatar";
	},
	definirFecha: function (fechanacimiento){
		var user=Meteor.users.findOne({_id:this.userId});
		if (user.birthday != undefined)
			return "Fecha de nacimiento no modificable";
		Meteor.users.update({_id: this.userId},{$set: {birthday:fechanacimiento}});
		return "Actualizada fecha de nacimiento";
	},
	definirEmail: function (email){
		var user=Meteor.users.findOne({_id:this.userId});
		if (user.address==email)
			return "Correo electronico no actualizado, es el mismo"
		Meteor.users.update({_id: this.userId},{$set: {address:email}});
		return "Actualizado correo electronico";
	},
	//Puntuacion alien y frootwars 
	matchFinish: function (match_id, game_id, points) {
    	Partidas.update({_id: match_id},{$set: {finish:"true", time_end:Date.now()}});
        Ranking.insert({user_id: this.userId, game_id: game_id, score: points});
        /*if (Ranking.find({game_id: game_id, user_id:this.userId}).count()==6){
        		var list = Ranking.findOne({game_id: game_id, user_id:this.userId},{sort:{score:-1}});
        		console.log(list);
        		var list2 = Ranking.find({game_id: game_id, user_id:this.userId},{sort:{score:-1}});
        		console.log(list2[0]);
        }*/
				
    }
});
