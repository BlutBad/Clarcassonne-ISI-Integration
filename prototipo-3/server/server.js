Meteor.publish("users", function() {
 	
	return Meteor.users.find();

});

Meteor.publish("messages", function() {
 	
	return Messages.find();

});

Meteor.publish("games", function() {
 	
	return Games.find();

});

Meteor.publish("matches", function() {

	return Matches.find();	

});
