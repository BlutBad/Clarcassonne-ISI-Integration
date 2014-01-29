//Metodos IA <-> IU
  
 endTablero={};

 Meteor.methods({

    InicioJuego:function(id_partida){
	if (endTablero[id_partida]==undefined){
		endTablero[id_partida]=true;
	       	Tablero= new ObjTablero(id_partida);
		Tablero.iniciar();

		Jugadores_ID= Partidas.findOne({_id: id_partida}).jugadores;
	
		for(i=0;i<Jugadores_ID.length;i++){
			
			if (Jugadores_ID[i].user_id.slice(0,10) == "Jugador_IA"){
					Tablero.listaJugadores.push(new ObjetoJugador(Jugadores_ID[i],Jugadores_ID[i].user_id,"01/01/1800"));
			}else{
				var player =resolverUser(Jugadores_ID[i]);
				Tablero.listaJugadores.push(new ObjetoJugador(Jugadores_ID[i],player.nombre,player.fecha));
			}
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
    
    
    
    ColocarFicha:function(id_partida,tipoFicha, coordenada, n_giros,id_jugador){
      Tablero= endTablero[id_partida];
      var nuevaficha = new ObjetoFicha(0,0,0,tipoFicha);
      for (var i=0; i<n_giros;i++){nuevaficha.girar()}
      
      var fichaColocada =Tablero.colocarficha(nuevaficha,coordenada.x,coordenada.y); 
      if (fichaColocada == 0){return 0}
	 		var seguidores = [];
			var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id.user_id == id_jugador)});
			if (Jugador.n_seguidores != 0){
	      var seguidores=Tablero.colocarseguidor(fichaColocada);	    
			}
			endTablero[id_partida]=Tablero;
      return seguidores; 
    },
    //Coloca la ficha en el tablero, devuelve la lista de los posibles seguidores o 0 si no se produce error
    
    
    
    ColocarSeguidor:function(id_partida, id_jugador, coordenada, seguidor){
      Tablero= endTablero[id_partida];
      var ficha= Tablero.buscarxcoor(coordenada.x,coordenada.y);
        
        //console.log("SEGUIDOR",seguidor,id_jugador);

        if (seguidor){
        //console.log("j"+id_jugador);
        //console.log("JUGADORES -->",Tablero.listaJugadores);

                var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id.user_id == id_jugador)})
        //console.log("Juga" + Jugador);        
                var nuevoSeguidor = {t:seguidor.t, n:seguidor.n, j:Jugador.numero, f:ficha}
                ficha.seguidores.push(nuevoSeguidor);
        }
                
          cierraCamino(ficha,1);
          cierraClaustro(ficha,1);
          cierraCastillo(ficha,1);
          endTablero[id_partida]=Tablero;

	  if (Tablero.totalFichas == 0){
		var puntuacion=[];
		puntosFinal();
		for (i=0; i< Tablero.listaJugadores.length; i++){
			puntuacion.push({user_id: Tablero.listaJugadores[i].id.user_id, puntos: Tablero.listaJugadores[i].puntos});
		}
	  	Partidas.update(id_partida,{$set:{terminada: true, puntuacion: puntuacion}});
		matchMulti(id_partida);
	  }


          return Tablero.listaJugadores;
      
      },
    
    //Coloca el seguidor en la ficha indicada y suma los correspondientes puntos. Acaba el turno. 
    
      
   	JugadorArtificial: function(id_partida,id_jugador){
				Tablero= endTablero[id_partida];
        var fichaColocada=0;
        while (fichaColocada==0){
         // var n_jugador = id_jugador.split("Jugador_IA");
         // console.log("NUMERO",n_jugador);
          var x=jugadorIA(id_jugador);
          var nuevaficha= new ObjetoFicha(0,0,0,x[0]);
          console.log("nuevaficha",nuevaficha);
          for (var i=0; i<x[1].giros;i++){nuevaficha.girar()}
          fichaColocada =Tablero.colocarficha(nuevaficha,x[1].coorx,x[1].coory);
          console.log("FICHACOLOCADA",fichaColocada);
        }
		  var nuevoSeguidor = {t:undefined, n:undefined, j:undefined, f:undefined}
        var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.id.user_id == id_jugador)})
        if (Jugador.n_seguidores!=0){
                
                if (fichaColocada.tipo=="Catedral" || fichaColocada.tipo=="Posada"){
                    nuevoSeguidor = {t:"Monje", n:8, j:Jugador.numero, f:fichaColocada}
                    Tablero.colocaSeguidor(fichaColocada,nuevoSeguidor,Jugador);
                }
								
                else{
                
										 var n_rand = Math.floor(Math.random() * 3);
										 if (n_rand ==1){
										      	seguidores=Tablero.colocarseguidor(fichaColocada);
														var s_rand = Math.floor(Math.random()* seguidores.length) //A lo mejor no es -1
														seguidor = seguidores[s_rand];
														nuevoSeguidor = {t:seguidor.t, n:seguidor.n, j:Jugador.numero, f:fichaColocada}
														Tablero.colocaSeguidor(fichaColocada,nuevoSeguidor,Jugador);
					console.log("DENTRO DEL IF NUEVO SEGUIDOR--->",nuevoSeguidor);
								 }
							}
        }
        
        
        
        cierraCamino(fichaColocada,1);
        cierraClaustro(fichaColocada,1);
        cierraCastillo(fichaColocada,1);
				endTablero[id_partida]=Tablero;
        console.log("NUEVOSEGUIDOR-------->>>",nuevoSeguidor);
        return [nuevaficha.tipo,x[1].giros,x[1].coorx,x[1].coory,Tablero.listaJugadores,nuevoSeguidor.t, nuevoSeguidor.n]
      }
    
})






  



