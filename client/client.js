
//Mostramos la lista de menus
Template.main_menu.main_menu = function() {
  return Menu.find({});
};

//Si el objeto seleccionado es el torrneos, mostramos info de los torneos
Template.torneos.show = function() {
  return Session.get('current_menu') == 'Torneos';
};


// La variable {{current}} tiene asosido un id, donde esta puesta, si esos ides
// son iguales entonce el class del menu es selected, sale en azul, si no lo es, nada
Template.main_menu.current = function() {
  return Session.equals('current_menu', this.name) ? 'current' : '';
};

Template.main_menu.events({
  // Si esta pulsado el boton del raton sobre alguno de los menus
  // Si estas pinchando sobre el mismo tag que ya esta seleccionado
  'mousedown li' : function() {
    // Si estas pinchando sobre el mismo tag que ya esta seleccionado
    if (Session.equals('current_menu', this.name)){
    // Poner lo a null, es decir celeccionar por defecto
      Session.set('current_menu', null);
    }else{
    // De otra manera apuntar nuevo id del tag seleccionado
      Session.set('current_menu', this.name);}
    }
});