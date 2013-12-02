Template.profile.showprofile = function() { 
	//name= Meteor.user().profile.name;
	//username= Meteor.user().username;
	if (Meteor.user()){
	}
	return Session.get('current_stage') == 'Mi perfil';
};

Template.profile.showprofile = function() { 	
	stage=Session.get('current_stage');
	if (stage=="Mi perfil"){
	if (Meteor.user()){
		if (!Usuarios.findOne({_id:Meteor.user()._id})){
			console.log("here");

			ide= Meteor.user()._id;
			if (Meteor.user().username){
				username= Meteor.user().username;	
			}else{
				username=" ";
			}
			if (Meteor.user().profile.name){
				nombre=Meteor.user().profile.name;
			}else{
				nombre=" ";
			}
			jugadas=Ranking.find({userId: Meteor.user()._id});
			Usuarios.insert({_id: ide,username: username, nombre: nombre});
		};
		//jugadas=Ranking.count({userId: Meteor.user()._id});
		//console.log(jugadas);
		console.log(Meteor.user()._id);
		usuario=Usuarios.findOne({_id:Meteor.user()._id});
		console.log(usuario);
		console.log(usuario.username);
		console.log(usuario.nombre);	
		return usuario;
	};
	
		};
	
		
};

