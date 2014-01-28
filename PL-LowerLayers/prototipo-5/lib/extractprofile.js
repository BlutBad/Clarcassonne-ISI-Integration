
resolverUser = function(id) {
	var user = Meteor.users.findOne({_id:id.user_id});
    return {nombre: user.username, fecha: user.birthday}
}
