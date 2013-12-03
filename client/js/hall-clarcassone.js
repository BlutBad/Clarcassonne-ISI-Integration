Template.hall_clarcassone.show = function() {
    if (Session.get('current_stage') == 'klarkiHall') {
	UsersInHall.insert({
	    user_id : Meteor.userId()
	});
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
	    PartidasVolatiles.insert({
		creator_id : Meteor.userId()
	    });
	}
    }

});

Template.hall_clarcassone.partidasVolatiles = function() {
    return PartidasVolatiles.find({});
}

Template.hall_clarcassone.UsersInHall = function() {
    return UsersInHall.find({});
}
