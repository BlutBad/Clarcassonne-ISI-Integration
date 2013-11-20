Template.juegos.show = function() {
  return Session.get('current_stage') == 'Juegos';
};


Template.juegos.juegos = function() {
  
  return Juegos.find({});
}


Template.juegos.events({

  'click img' : function() {
    console.log(this.name);
     //Si estas pinchando sobre el mismo tag que ya esta seleccionado
    if (Session.equals('current_stage', this.name)){
    // Poner lo a null, es decir celeccionar por defecto
      Session.set('current_stage', 'Dashboard');
    }else{
    // De otra manera apuntar nuevo id del tag seleccionado
      Session.set('current_stage', this.name);
    }
    
}
    
});