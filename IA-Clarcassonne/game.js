//Metodos IA <-> IU
  
 endTablero={};

 Meteor.methods({

    InicioJuego:function(id_partida){
	console.log(id_partida);      
	if (endTablero[id_partida]==undefined){
		endTablero[id_partida]=true;
	       	Tablero= new Tablero(id_partida);
		Tablero.iniciar();

		Jugadores_ID= Partidas.findOne({_id: id_partida}).jugadores;
	
		for(i=0;i<Jugadores_ID.length;i++){
			var player =resolverUser(Jugadores_ID[i]);
			Tablero.listaJugadores.push(new ObjetoJugador(Jugadores_ID[i],player.nombre,player.fecha));
		}
		
		//ordenamos a los jugadores por edad
		Tablero.listaJugadores=_.sortBy(Tablero.listaJugadores, function(jugador){ return jugador.edad; });
	       
		//les asignamos el orden con el numero de jugador
		var i=1;
		_.each(Tablero.listaJugadores, function(jugador){jugador.numero=i; i++});
		
		endTablero[id_partida]=Tablero;
		
        	return Tablero.listaJugadores;
	}else{
		Tablero=endTablero[id_partida];
		return Tablero.listaJugadores;
	}
    },
    
    //Devuelve una lista de objetos jugador con todos los parametros
    
    
    Robar:function(id_partida){
	Tablero= endTablero[id_partida];   
        var robar=Tablero.robarFicha(); 
        var nuevaficha = new ObjetoFicha(0,0,0,robar);
        Tablero.buscarCandidatos(nuevaficha);
	endTablero[id_partida]=Tablero;
        return [nuevaficha.tipo,nuevaficha.encajaCon];
    },
    //Devuelve una lista del tipo [string,lista[]] string= tipo ficha, lista= coordenadas donde encaja
    
    
    
    ColocarFicha:function(id_partida,tipoFicha, coordenada, n_giros){
      Tablero= endTablero[id_partida];
      var nuevaficha = new ObjetoFicha(0,0,0,tipoFicha);
      for (var i=0; i<n_giros;i++){nuevaficha.girar()}
      
      var fichaColocada =Tablero.colocarficha(nuevaficha,coordenada.x,coordenada.y); 
      if (fichaColocada == 0){return 0}
      console.log("fichaColocada", fichaColocada);
      var seguidores=Tablero.colocarseguidor(fichaColocada);
      endTablero[id_partida]=Tablero;
      return seguidores; 
    },
    //Coloca la ficha en el tablero, devuelve la lista de los posibles seguidores o 0 si no se produce error
    
    
    
    ColocarSeguidor:function(id_partida, id_jugador, coordenada, seguidor){

      var ficha= Tablero.buscarxcoor(coordenada.x,coordenada.y);
        Tablero= endTablero[id_partida];
        if (seguidor){
        
                var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id == id_jugador)})
                
                var nuevoSeguidor = {t:seguidor.t, n:seguidor.n, j:Jugador.numero, f:ficha}
                ficha.seguidores.push(nuevoSeguidor);
        }
                
          cierraCamino(ficha,1);
          cierraClaustro(ficha,1);
          cierraCastillo(ficha,1);
          endTablero[id_partida]=Tablero;
          return Tablero.listaJugadores;
      
      }
    
    //Coloca el seguidor en la ficha indicada y suma los correspondientes puntos. Acaba el turno. 
    
    
})






  



