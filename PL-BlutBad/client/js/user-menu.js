
//Mostramos la lista de menus
Template.user_menu.user_menu = function() {
  return Menu_user.find({});
};
 

// La variable {{current}} tiene asosido un id, donde esta puesta, si esos ides
// son iguales entonce el class del menu es selected, sale en azul, si no lo es, nada
Template.user_menu.current = function() {
  return Session.equals('current_stage', this.name) ? 'user-menu-current' : '';
};


Template.user_menu.events({
  // Si esta pulsado el boton del raton sobre alguno de los menus
  // Si estas pinchando sobre el mismo tag que ya esta seleccionado
  'mousedown li' : function() {
    console.log(this.name);
    // Si estas pinchando sobre el mismo tag que ya esta seleccionado
    if (Session.equals('current_stage', this.name)){
    // Poner lo a null, es decir celeccionar por defecto
      Session.set('current_stage', 'Dashboard');
    }else{
    // De otra manera apuntar nuevo id del tag seleccionado
      Session.set('current_stage', this.name);}
    },
     'keydown input#tags': function(e){
    if (e.which == 13) {
      var name=$("#tags").val();
      if (Meteor.users.findOne({username: name})){
        console.log("esta");
        console.log(Meteor.users.findOne({username: name})._id);
         Session.set("profilfriend", Meteor.users.findOne({username: name})._id);
       // return Session.set('current_stage', 'PerfilAmigo');
  
      }else{
        console.log("no esta");
      }
    };
  }

});

Template.friendprofil.events({

   

    'click .cancel' : function() {
        Session.set('profilfriend', null); 
    }

});

Template.friendprofil.torneo = function() {
    var id = Session.get('profilfriend');
    //console.log(id)
    return Meteor.users.findOne({
        _id : id
    });
};

Template.user_menu.showprofilfriend = function() {
    return Session.get('profilfriend', this._id); 
}   



