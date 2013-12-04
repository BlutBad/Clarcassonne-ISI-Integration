Template.hall_clarcassone.show = function() {
    if (Session.get('current_stage') == 'klarkiHall') {
	if (Meteor.userId()) {
	    UsersInHall.insert({
		user_id : Meteor.userId()
	    });
	}
	return true;
    } else {
	userA = UsersInHall.findOne({
	    user_id : Meteor.userId()
	});
	if (userA) {
	    UsersInHall.remove(userA._id);
	}
	return false;
    }
};

Template.hall_clarcassone.events({
    'click #nuevaPartida' : function() {
	console.log("Nueva partida");
	if (Meteor.userId()) {
	    // ^.^ edad = Math.floor(Random.fraction() * 70);
	    PartidasVolatiles.insert({
		creator_id : Meteor.userId(),
		jugadores : [ Meteor.userId() ]
	    });
	}
    },
    'click .removeparty' : function() {
	PartidasVolatiles.remove(this._id);
    },
    'click .startparty' : function() {
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

Template.hall_clarcassone.userRango = function(user_id) {

    gid = Session.get("current_game");
    if (gid) {
	rankingU = Ranking.findOne({
	    gameId : gid,
	    userId : user_id
	})
	if (rankingU) {
	    return Rangos.findOne({
		_id : rankingU.rango_id
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
