
Template.hall_clarcassone.show = function() {
	return Session.get('current_stage') == 'klarkiHall';
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
