Meteor.publish("partidas", function(current_game_id) {

        return Partidas.find({"game_id" : current_game_id});        

});





Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
        return true;
    }
});
