//Metodos IA <-> IU
  


 Meteor.methods({

    InicioJuego:function(id_partida){
	console.log(id_partida);      

	       	Tablero= new ObjTablero(id_partida);
		Tablero.iniciar();

		 Tablero.listaJugadores.push(new ObjetoJugador("PEfGy56JLuo6K2xXW","Paco",23));
        	Tablero.listaJugadores.push(new ObjetoJugador("Jugador_IA1","J_IA1",34));
        	//Tablero.listaJugadores.push(new ObjetoJugador("Jugador_IA2","J_IA2",35));
        	//Tablero.listaJugadores.push(new ObjetoJugador("Jugador_IA3","J_IA3",36));
        	Tablero.listaJugadores.push(new ObjetoJugador("PEfGy56JLuo6K2xXW","Fulano",17));
        	Tablero.listaJugadores.push(new ObjetoJugador("PEfGy56JLuo6K2xXW","Zutano",12));
		
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
    },
    //Devuelve una lista del tipo [string,lista[]] string= tipo ficha, lista= coordenadas donde encaja
    
    
    
    ColocarFicha:function(id_partida,tipoFicha, coordenada, n_giros, id_jugador){
      var nuevaficha = new ObjetoFicha(0,0,0,tipoFicha);
      for (var i=0; i<n_giros;i++){nuevaficha.girar()}
      
      var fichaColocada =Tablero.colocarficha(nuevaficha,coordenada.x,coordenada.y); 
      if (fichaColocada == 0){return 0}
      console.log("fichaColocada", fichaColocada);
      var seguidores= [];
      
      var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id == id_jugador)})
      if (Jugador.n_seguidores!=0){
              seguidores=Tablero.colocarseguidor(fichaColocada);
      }
      return seguidores; 
    },
    //Coloca la ficha en el tablero, devuelve la lista de los posibles seguidores o 0 si no se produce error
    
    
    
    ColocarSeguidor:function(id_partida, id_jugador, coordenada, seguidor){

      var ficha= Tablero.buscarxcoor(coordenada.x,coordenada.y);
        //console.log("SEGUIDOR",seguidor,id_jugador);

        if (seguidor){
        //console.log("j"+id_jugador);
        //console.log("JUGADORES -->",Tablero.listaJugadores);

                var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id == id_jugador)})
        //console.log("Juga" + Jugador);        
                var nuevoSeguidor = {t:seguidor.t, n:seguidor.n, j:Jugador.numero, f:ficha}
                ficha.seguidores.push(nuevoSeguidor);
        }
                
          cierraCamino(ficha,1);
          cierraClaustro(ficha,1);
          cierraCastillo(ficha,1);

	  if (Tablero.totalFichas == 0){
		var puntuacion=[];
		puntosFinal();
		for (i=0; i< Tablero.listaJugadores.length; i++){
			puntuacion.push({user_id: Tablero.listaJugadores[i].id, puntos: Tablero.listaJugadores[i].puntos});
		}
	  	Partidas.update(id_partida,{terminada: true, puntuacion: puntuacion});
		matchMulti(id_partida);
	  }

          return Tablero.listaJugadores;
      
      },
      
    JugadorArtificial: function(id_partida,id_jugador){
        var fichaColocada=0;
        while (fichaColocada==0){
          var n_jugador = id_jugador.split("Jugador_IA");
          console.log("NUMERO",n_jugador);
          var x=jugadorIA(n_jugador[1]);
          var nuevaficha= new ObjetoFicha(0,0,0,x[0]);
          console.log("nuevaficha",nuevaficha);
          for (var i=0; i<x[1].giros;i++){nuevaficha.girar()}
          fichaColocada =Tablero.colocarficha(nuevaficha,x[1].coorx,x[1].coory);
          console.log("FICHACOLOCADA",fichaColocada);
        }
        
        cierraCamino(fichaColocada,1);
        //cierraClaustro(fichaColocada,1);
        cierraCastillo(fichaColocada,1);
        
        return [nuevaficha.tipo,x[1].giros,x[1].coorx,x[1].coory,Tablero.listaJugadores]
        
        
    }
    
    //Coloca el seguidor en la ficha indicada y suma los correspondientes puntos. Acaba el turno. 
    
    
})






  



