
//Mostramos la lista de menus
Template.user_menu.user_menu = function() {
  return Menu_user.find({});
};
 

// La variable {{current}} tiene asosido un id, donde esta puesta, si esos ides
// son iguales entonce el class del menu es selected, sale en azul, si no lo es, nada
Template.user_menu.current = function() {
  return Session.equals('current_stage', this.name) ? 'current' : '';
};

Template.user_menu.events({
  // Si esta pulsado el boton del raton sobre alguno de los menus
  // Si estas pinchando sobre el mismo tag que ya esta seleccionado
  'mousedown li' : function() {
    // Si estas pinchando sobre el mismo tag que ya esta seleccionado
    if (Session.equals('current_stage', this.name)){
    // Poner lo a null, es decir celeccionar por defecto
      Session.set('current_stage', 'Dashboard');
    }else{
    // De otra manera apuntar nuevo id del tag seleccionado
      Session.set('current_stage', this.name);}
    }

});