
 /// Prueba del código de game.js
 
 
 var InicioJuego=function(id_partida){       

       Tablero.iniciar();

	Meteor.subscribe("partidas",id_partida);
	Jugadores_ID= Partidas.find();
	console.log(Jugadores_ID);
	for(i=0;i<Jugadores_ID.length;i++){
		Jugador=resolverUser(Jugadores_ID[i]);
		//creamos la lista de jugadores
		Tablero.listaJugadores.push(new ObjetoJugador(Jugadores_ID[i],Jugador.nombre,Jugador.fecha));
	}
        
        //ordenamos a los jugadores por edad
        Tablero.listaJugadores=_.sortBy(Tablero.listaJugadores, function(jugador){ return jugador.edad; });
       
       
        //les asignamos el orden con el numero de jugador
        var i=1;
        _.each(Tablero.listaJugadores, function(jugador){jugador.numero=i; i++});
           
        return Tablero.listaJugadores;
    };
    
    //Devuelve una lista de objetos jugador con todos los parametros
    
    
  var Robar=function(id_partida){                    
        var robar=Tablero.robarFicha(); 
        var nuevaficha = new ObjetoFicha(0,0,0,robar);
        Tablero.buscarCandidatos(nuevaficha);
        return [nuevaficha.tipo,nuevaficha.encajaCon];
    }
    //Devuelve una lista del tipo [string,lista[]] string= tipo ficha, lista= coordenadas donde encaja
    
  var ColocarFicha=function(id_partida,tipoFicha, coordenada, n_giros){
      var nuevaficha = new ObjetoFicha(0,0,0,tipoFicha);
      for (var i=0; i<n_giros;i++){nuevaficha.girar()}
      
      var fichaColocada =Tablero.colocarficha(nuevaficha,coordenada.x,coordenada.y); 
      if (fichaColocada == 0){return 0}
      console.log("fichaColocada", fichaColocada);
      var seguidores=Tablero.colocarseguidor(fichaColocada);
      return seguidores; 
  }
  

  var ColocarSeguidor=function(id_partida, id_jugador, coordenada, seguidor){
      
      if (seguidor){
      
              var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id == id_jugador)})
              var ficha= Tablero.buscarxcoor(coordenada.x,coordenada.y);
              var nuevoSeguidor = {t:seguidor.t, n:seguidor.n, j:Jugador.numero, f:ficha}
      }
      if (ficha.seguidores.push(nuevoSeguidor) || seguidor==0) {
        Tablero.cierraCamino(ficha,1);
        Tablero.cierraClaustro(ficha,1);
        Tablero.cierraCastillo(ficha,1);
        return Tablero.listaJugadores;
      
      } else {return 0}
      
    }
      
      
  
  
  

