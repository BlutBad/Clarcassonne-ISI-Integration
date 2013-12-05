Template.hall_clarcassone.show = function() {
   //Mostrar el hall de clarcassone si ...
	userA = UsersInHall.findOne({
	    user_id : Meteor.userId()
	});
    if (Session.get('current_stage') == 'klarkiHall') {
		//Dejar al user estar en lista de jugadores solo si esta auntenticado
		if (Meteor.userId() && !userA) {
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
				} 
			}
		} else {	 
			Session.set("createError", "Regístrate para crear partidas!");
		}
    },
    'click .removeparty' : function() {
		PartidasVolatiles.remove(this._id);
    },
    'click .startparty' : function() {
		//Hacer una entrada a la coleccion de Partidas, 
		//y llamar a ui y ai con ese _id de la partida.
		console.log('Crear una partida de verdad');
    },

    'click .unirme' : function() {
		console.log('Unirme a una partida');
		PartidasVolatiles.update(this._id, {
		    $push : {
				jugadores : Meteor.userId()
		    }
		});
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
