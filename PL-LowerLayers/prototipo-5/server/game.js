//Metodos IA <-> IU
  
 Meteor.methods({

    InicioJuego:function(id_partida){       

       	Tablero.iniciar();

	Jugadores_ID= Partidas.findOne({_id: id_partida}).jugadores;
	
	for(i=0;i<Jugadores_ID.length;i++){
		var player =resolverUser(Jugadores_ID[i]);
		Tablero.listaJugadores.push(new ObjetoJugador(Jugadores_ID[i],player.nombre,player.fecha));
	}
        
        //creamos la lista de jugadores
        /*Tablero.listaJugadores.push(new ObjetoJugador(123,"Paco",23));
        Tablero.listaJugadores.push(new ObjetoJugador(12,"Pepe",88));
        Tablero.listaJugadores.push(new ObjetoJugador(45,"Mengano",34));
        Tablero.listaJugadores.push(new ObjetoJugador(88,"Fulano",17));
        Tablero.listaJugadores.push(new ObjetoJugador(128,"Zutano",12));*/
        
        //ordenamos a los jugadores por edad
        Tablero.listaJugadores=_.sortBy(Tablero.listaJugadores, function(jugador){ return jugador.edad; });
       
        //les asignamos el orden con el numero de jugador
        var i=1;
        _.each(Tablero.listaJugadores, function(jugador){jugador.numero=i; i++});
        

	Partidas.update(id_partida, {
                            $push : {endTablero : Tablero}
                });

	console.log(Tablero.listaJugadores);
        return Tablero.listaJugadores;
    },
    
    //Devuelve una lista de objetos jugador con todos los parametros
    
    
    Robar:function(id_partida){    
	var partida= Partidas.findOne({_id: id_partida});      
	Tablero= partida.endTablero;
	console.log("ESTE ES NUESTRO TABLERO: " + Tablero.huecos);         
        var robar=Tablero.robarFicha(); 
        var nuevaficha = new ObjetoFicha(0,0,0,robar);
        Tablero.buscarCandidatos(nuevaficha);
	Partidas.update(id_partida, {
                            $set : {Tablero : Tablero}
                });
        return [nuevaficha.tipo,nuevaficha.encajaCon];
    },
    //Devuelve una lista del tipo [string,lista[]] string= tipo ficha, lista= coordenadas donde encaja
    
    
    
    ColocarFicha:function(id_partida,tipoFicha, coordenada, n_giros){
      var partida= Partidas.findOne({_id: id_partida});      
      Tablero= partida.Tablero;
      console.log("ESTE ES NUESTRO TABLERO: " + Tablero.huecos); 
      var nuevaficha = new ObjetoFicha(0,0,0,tipoFicha);
      for (var i=0; i<n_giros;i++){nuevaficha.girar()}
      
      var fichaColocada =Tablero.colocarficha(nuevaficha,coordenada.x,coordenada.y); 
      if (fichaColocada == 0){return 0}
      console.log("fichaColocada", fichaColocada);
      var seguidores=Tablero.colocarseguidor(fichaColocada);
      Partidas.update(id_partida, {
                            $set : {Tablero : Tablero}
                });
      return seguidores; 
    },
    //Coloca la ficha en el tablero, devuelve la lista de los posibles seguidores o 0 si no se produce error
    
    
    
    ColocarSeguidor:function(id_partida, id_jugador, coordenada, seguidor){
      var partida= Partidas.findOne({_id: id_partida});      
      Tablero= partida.Tablero;
      console.log("ESTE ES NUESTRO TABLERO: " + Tablero.huecos); 
      var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id == id_jugador)})
      var ficha= Tablero.buscarxcoor(coordenada.x,coordenada.y);
      var nuevoSeguidor = {t:seguidor.t, n:seguidor.n, j:Jugador.numero, f:ficha}
      if (ficha.seguidores.push(nuevoSeguidor)) {
        Tablero.cierraCamino(ficha,1);
        Tablero.cierraClaustro(ficha,1);
        Tablero.cierraCastillo(ficha,1);
	Partidas.update(id_partida, {
                            $set : {Tablero : Tablero}
                });
        return 1;
      
      }else {
	    Partidas.update(id_partida, {
                            $set : {Tablero : Tablero}
                });
	    return 0
      }
      
    }
    //Coloca el seguidor en la ficha indicada y suma los correspondientes puntos. Acaba el turno. 
    
    
})






  



