Template.hall_clarcassone.show = function() {
   //Mostrar el hall de clarcassone si ...
	userA = UsersInHall.findOne({
	    user_id : Meteor.userId()
	});
    if (Session.get('current_stage') == 'klarkiHall') {
    	userCreator = PartidasVolatiles.findOne({
			creator_id: Meteor.userId()
		});
		usersJoined = PartidasVolatiles.find({});
		usersinParty = false;
		usersJoined.forEach(function(each) {  
			if (_.contains(each.jugadores, Meteor.userId())) {
				usersinParty = true;
			}
		}); 
		//Dejar al user estar en lista de jugadores solo si esta auntenticado
		if (Meteor.userId() && !userA && !usersinParty) {
		    UsersInHall.insert({
				user_id : Meteor.userId()
		    });
		}
		return true;
    } else {
		//Si el estado cambia, ya no estamos en el hall de clarkasonne
		//borrar al user de los juadores online
		
		if (userA) {
		    UsersInHall.remove(userA._id);
		}
		return false;
    }
};

Template.hall_clarcassone.error = function () {
	return Session.get("createError");
};

Template.hall_clarcassone.events({
    'click #nuevaPartida' : function() { 
		if (Meteor.userId()) {
		    userA = UsersInHall.findOne({
		    	user_id : Meteor.userId()
			}); 
			userCreator = PartidasVolatiles.findOne({
				creator_id: Meteor.userId()
			})
			if (userCreator) {
				Session.set("createError", "Ya creaste una partida!");
			} else {
				if (userA) {
				    // ^.^ edad = Math.floor(Random.fraction() * 70);
				    PartidasVolatiles.insert({
						creator_id : Meteor.userId(),
						jugadores : [ Meteor.userId() ]
				    }); 
					UsersInHall.remove(userA._id); 
					Session.set("createError", undefined);
				} else {
					Session.set("createError", "Ya estás en una partida.... no crees otra! :D");
				}
			}
		} else {	 
			Session.set("createError", "Regístrate para crear partidas!");
		}
    },
    'click .removeparty' : function() {
    	userCreator = PartidasVolatiles.findOne({
			creator_id: Meteor.userId()
		});
		if (userCreator) {
			PartidasVolatiles.remove(this._id);
			Session.set("createError", undefined);
		} else {
			Session.set("createError", "No borres partidas que no has creado tú.... o.o");			
		}
    },
    'click .startparty' : function() {
		//Hacer una entrada a la coleccion de Partidas, 
		//y llamar a ui y ai con ese _id de la partida.
		console.log('Crear una partida de verdad');
    },

    'click .unirme' : function() {
		//console.log('Unirme a una partida');
		userCreator = PartidasVolatiles.findOne({
			creator_id: Meteor.userId()
		});
		usersJoined = PartidasVolatiles.findOne({
			_id: this._id
		}).jugadores;
		usersinParty = _.contains(usersJoined, Meteor.userId());
		userA = UsersInHall.findOne({
		    user_id : Meteor.userId()
		});
		if (!userCreator && !usersinParty) {
			PartidasVolatiles.update(this._id, {
			    $push : {
					jugadores : Meteor.userId()
			    }
			});
			if (userA) {
			    UsersInHall.remove(userA._id);
			}
			Session.set("createError", undefined);
		} else {
			Session.set("createError", "Ya estás en esta partida!");
		}
    },

});

Template.hall_clarcassone.partidasVolatiles = function() {
    return PartidasVolatiles.find({});
}

Template.hall_clarcassone.UsersInHall = function() {
    return UsersInHall.find({});
}


//El rango del usuario en la tabla de miembros de la partida
Template.hall_clarcassone.userRango = function(user_id) {
    gid = Session.get("current_game");
    if (gid) {
		rankingU = Ranking.findOne({
		    gameId : gid,
		    userId : user_id
		})
	if (rankingU) {
	    return Rangos.findOne({
			id : rankingU.rango_id
	    }).rango;
	} else {
	    return Rangos.findOne({
			game_id : gid
	    }).rango;
	}
    } else {
		return "--"
    }
}
