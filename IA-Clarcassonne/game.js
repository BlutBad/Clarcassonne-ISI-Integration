 //Metodos IA <-> IU
  
 Meteor.methods({

    InicioJuego:function(id_partida){       

 	Tablero.iniciar();
	Meteor.subscribe("partidas",id_partida);
	Jugadores= Partidas.find();

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
    
    
    Robar:function(){                    
        var robar=Tablero.robarFicha(); 
        var nuevaficha = new ObjetoFicha(0,0,0,robar);
        Tablero.buscarCandidatos(nuevaficha);
        return [nuevaficha.tipo,nuevaficha.encajaCon];
    }
    //Devuelve una lista del tipo [string,lista[]] string= tipo ficha, lista= coordenadas donde encaja
})

  



