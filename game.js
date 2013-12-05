



$(function() {

var inciarJuego=function(){
  Tablero.listaJugadores.push(new ObjetoJugador("Pacman","Paco",23));
  Tablero.listaJugadores.push(new ObjetoJugador("Pepman","Pepe",88));
  Tablero.listaJugadores.push(new ObjetoJugador("Menman","Menganito",34));
  Tablero.listaJugadores.push(new ObjetoJugador("Fulman","Fulanito",12));
  
  Console.log(Tablero.listaJugadores);
}
 
 
 
 
 
 
 
});


