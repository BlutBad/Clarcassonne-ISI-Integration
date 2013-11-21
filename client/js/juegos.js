Template.juegos.show = function() {
  return Session.get('current_stage') == 'Juegos';
};

Template.juegos.juegos = function() {

  return Juegos.find({});
}

Template.juegos.events({

  'click img' : function() {
    console.log(this.name);
    // Si estas pinchando sobre el mismo tag que ya esta seleccionado
    if (Session.equals('current_stage', this.name)) {
      // Poner lo a null, es decir celeccionar por defecto
      Session.set('current_stage', 'Juegos');
    } else {
      // De otra manera apuntar nuevo id del tag seleccionado
      Session.set('current_stage', this.name);
    }

  }

});


Template.gamecontainer.show = function() {
  return Session.equals('current_stage', 'AlienInvasion') || Session.equals('current_stage', 'Froot war') || Session.equals('current_stage', 'Clarkasone');
};


Template.gamecontainer.rendered = function() {
  Game.initialize("gamealien", sprites, startGame);
  console.log('render');
   if (Session.equals('current_stage', 'AlienInvasion')) {
    $("#GameFrootWars").hide();
    $("#GameCarcassone").hide();
    $("#GameAlienInvasion").show();
  } else if (Session.equals('current_stage', 'Froot war')) {
    $("#GameFrootWars").show();
    $("#GameCarcassone").hide();
    $("#GameAlienInvasion").hide();
  } else if (Session.equals('current_stage', 'Clarkasone')) {
    $("#GameFrootWars").hide();
    $("#GameCarcassone").show();
    $("#GameAlienInvasion").hide();
  } else{
    $("#GameFrootWars").hide();
    $("#GameCarcassone").hide();
    $("#GameAlienInvasion").hide();
  }

}