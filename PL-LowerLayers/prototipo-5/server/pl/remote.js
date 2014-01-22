
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
});
