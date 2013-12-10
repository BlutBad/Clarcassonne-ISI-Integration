 //Metodos IA <-> IU
  
 Meteor.methods({

    InicioJuego:function(id_partida){       

       	Tablero.iniciar();
	     /*
	      Meteor.subscribe("partidas",id_partida);
	      Jugadores= Partidas.find();
        */
        //creamos la lista de jugadores
        Tablero.listaJugadores.push(new ObjetoJugador(123,"Paco",23));
        Tablero.listaJugadores.push(new ObjetoJugador(12,"Pepe",88));
        Tablero.listaJugadores.push(new ObjetoJugador(45,"Mengano",34));
        Tablero.listaJugadores.push(new ObjetoJugador(88,"Fulano",17));
        Tablero.listaJugadores.push(new ObjetoJugador(128,"Zutano",12));
        
        //ordenamos a los jugadores por edad
        Tablero.listaJugadores=_.sortBy(Tablero.listaJugadores, function(jugador){ return jugador.edad; });
       
       
        //les asignamos el orden con el numero de jugador
        var i=1;
        _.each(Tablero.listaJugadores, function(jugador){jugador.numero=i; i++});
           
        return Tablero.listaJugadores;
    },
    
    //Devuelve una lista de objetos jugador con todos los parametros
    
    
    Robar:function(id_partida){                    
        var robar=Tablero.robarFicha(); 
        var nuevaficha = new ObjetoFicha(0,0,0,robar);
        Tablero.buscarCandidatos(nuevaficha);
        return [nuevaficha.tipo,nuevaficha.encajaCon];
    }
    //Devuelve una lista del tipo [string,lista[]] string= tipo ficha, lista= coordenadas donde encaja
    
    
    
    ColocarFicha:function(id_partida,tipoFicha, coordenada, n_giros){
      var nuevaficha = new ObjetoFicha(0,0,0,tipoFicha);
      for (var i=0; i<n_giros;i++){nuevaficha.girar()}
      
      var fichaColocada =Tablero.colocarficha(nuevaficha,coordenada.x,coordenada.y); 
      if (fichaColocada == 0){return 0}
      console.log("fichaColocada", fichaColocada);
      var seguidores=Tablero.colocarseguidor(fichaColocada);
      return seguidores; 
    }
    //Coloca la ficha en el tablero, devuelve la lista de los posibles seguidores o 0 si no se produce error
    
    
    
    ColocarSeguidor:function(id_partida, id_jugador, coordenada, seguidor){
      
      var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id == id_jugador)})
      var ficha= Tablero.buscarxcoor(coordenada.x,coordenada.y);
      var nuevoSeguidor = {t:seguidor.t, n:seguidor.n, j:Jugador.numero, f:ficha}
      if (ficha.seguidores.push(nuevoSeguidor)) {
        Tablero.cierraCamino(ficha,1);
        Tablero.cierraClaustro(ficha,1);
        Tablero.cierraCastillo(ficha,1);
        return 1;
      
      } else {return 0}
      
    }
    //Coloca el seguidor en la ficha indicada y suma los correspondientes puntos. Acaba el turno. 
    
    
})

  



