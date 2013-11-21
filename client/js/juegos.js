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

// De momento un poco chapuza, ya veremos como lo mejoramos
// Demasiadas combinaciones, que pasa si hay mas juegos? 
Deps.autorun(function(c) {
  if (Session.equals('current_stage', 'AlienInvasion')
      || Session.equals('current_stage', 'Froot war')
      || Session.equals('current_stage', 'Clarkasone')) {
    // El div en el que se van a mostrar juegos
    $("#gamecontainer").show();
    // Mostrar el juego seleccionado
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
    } else {
      $("#GameFrootWars").hide();
      $("#GameCarcassone").hide();
      $("#GameAlienInvasion").hide();
    }
  } else {
    $("#gamecontainer").hide();
  }
});


Template.gamecontainer.rendered = function() {
  // Se tiene que iniciar escondido el contenedor de juegos. No vale poner el
  // _default-set, porque no fucciona, hay que esconderlo cuando se vaya a
  // renderizar la plantilla
  $("#gamecontainer").hide();
  
  //Renderizar el juego en cuestion para le canvas
  Game.initialize("gamealien", sprites, startGame);
}