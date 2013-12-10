



$(function() {

/*
	//iniciamos el tablero
	Tablero.iniciar();

	//comprobamos que efectivamente la coordenada (5,5) es un hueco de ficha vacio. 
	var centro = Tablero.buscarxcoor(5,5);
	console.log("Tablero se inicia como lleno:",centro.lleno);

	//creamos una nueva ficha de tipo Ciudad1l2crect (por ejemplo) sin coordenadas
	var nuevaficha = new ObjetoFicha(0,0,0,"Ciudad1l2crect");
	//comprobamos que los parámetros se han rellenado
	console.log("ficha creada:",nuevaficha.tipo,nuevaficha.arriba,nuevaficha.abajo,
	                          nuevaficha.izda,nuevaficha.derecha,nuevaficha.escudo);
	//comprobamos si la ficha ha girado
	nuevaficha.girar();
	console.log("ficha girada:",nuevaficha.tipo,nuevaficha.arriba,nuevaficha.abajo,
	                          nuevaficha.izda,nuevaficha.derecha,nuevaficha.escudo);

	//La colocamos en el tablero

	Tablero.colocarficha(nuevaficha,5,5);



	//comprobamos los parametros
	var check= Tablero.buscarxcoor(5,5);
	console.log("hueco lleno:",check.i,check.tipo,check.arriba,check.abajo,check.izda,check.derecha,check.escudo);
	var check= Tablero.buscarxcoor(5,4);
	console.log("huco vacio:",check.i,check.tipo,check.arriba,check.abajo,check.izda,check.derecha,check.escudo);


	var nuevaficha2 = new ObjetoFicha(0,0,0,"Ciudad2lE");

	Tablero.buscarCandidatos(nuevaficha2);
	console.log("encaja con:",nuevaficha2.encajaCon);


  //totalFichas= 0;
	var robar = Tablero.robarFicha();
	console.log("objeto tipo de ficha: ",robar);
  var nuevaficha2 = new ObjetoFicha(0,0,0,robar);
  
  //La colocamos en el tablero

	Tablero.colocarficha(nuevaficha2,7,5);
	//comprobamos los parametros
	var check= Tablero.buscarxcoor(7,5);
	console.log("colocada ficha robada:",check.i,check.tipo,check.arriba,check.abajo,check.izda,check.derecha,check.escudo);


  //Prueba cierraCamino colocando ficha "cierracamino" (no cruces)
  Tablero.iniciar();
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	var x=Tablero.colocarficha(nuevaficha,3,1);	
	x.seguidores.push({t:"Ladron",n:4,j:1,f:x});  //le metemos ladron
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,3,2); 
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,3,3); 
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	nuevaficha.girar();
	nuevaficha.girar();
	var nuevaficha = Tablero.colocarficha(nuevaficha,3,4); 
	console.log("cierra camino1: ",Tablero.cierraCamino(nuevaficha));

	//Prueba cierra camino con cruces

	Tablero.iniciar();
	                      //por arriba (cerrado)
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	Tablero.colocarficha(nuevaficha,5,3);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,5,4); 
		                      // por abajo (cerrado)
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,5,6); 
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	nuevaficha.girar();
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,5,7);
		                      // por la izda (cerrado)
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,4,5);
	                      // por la dcha (abierto)
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,6,5); 

 
	                      //en el centro (la que cierra)
	var nuevaficha = new ObjetoFicha(0,0,0,"Ccruce");
	Tablero.colocarficha(nuevaficha,5,5); 
	Tablero.cierraCamino(nuevaficha,1);
	
	//Prueba cierraCamino colocando ficha intermedia
  Tablero.iniciar();
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	Tablero.colocarficha(nuevaficha,8,1);

	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,7,3);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
	nuevaficha.girar();
	nuevaficha.girar();
	nuevaficha.girar();
	var Rcurva83= Tablero.colocarficha(nuevaficha,8,3);	
	var lista= Tablero.colocarseguidor(Rcurva83);
	Rcurva83.seguidores.push(lista[0]);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta"); 
	Tablero.colocarficha(nuevaficha,8,2);
	console.log("cierra camino2: ",Tablero.cierraCamino(nuevaficha));
	
	//Prueba cierraCamino redondo, sin "cierracaminos"
	Tablero.iniciar();	
	var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
	Tablero.colocarficha(nuevaficha,5,5);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	var x=Tablero.colocarficha(nuevaficha,5,6);
	x.seguidores.push({t:"Ladron",n:4,j:1,f:x});  //le metemos ladron
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
  nuevaficha.girar();
  Tablero.colocarficha(nuevaficha,4,5);
  var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
  nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,3,5);
	console.log("lista: ", Tablero.colocarseguidor(nuevaficha)); // lista de seguidores
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,3,6);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
	nuevaficha.girar();
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,3,7);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
  nuevaficha.girar();
  Tablero.colocarficha(nuevaficha,4,7);
  var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
  nuevaficha.girar();
	nuevaficha.girar();
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,5,7);
	console.log("cierra camino3: ",Tablero.cierraCamino(nuevaficha))	
	

	//Prueba cierra camino sólo dos fichas
	Tablero.iniciar();	
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	var x=Tablero.colocarficha(nuevaficha,5,5);
	x.seguidores.push({t:"Ladron",n:4,j:1,f:x});  //le metemos ladron
	console.log("cierra camino4: ",Tablero.cierraCamino(nuevaficha))	

	
	//Prueba error al colocar fichas que no encajan
	Tablero.iniciar();
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	Tablero.colocarficha(nuevaficha,8,1);
  var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
  nuevaficha.girar();
	console.log("si no encaja 0:",Tablero.colocarficha(nuevaficha,8,2)); //No deberia encajar ---> devuelve 0
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	console.log("si no encaja 0:",Tablero.colocarficha(nuevaficha,8,1)); //No deberia encajar ----> devuelve 0
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	console.log("si encaja objeto ficha:",Tablero.colocarficha(nuevaficha,8,2)); //Deberia encajar ----> devuelve la ficha colocada


    //Prueba de cierra Castillo 1
    Tablero.iniciar();
    var nuevaficha = new ObjetoFicha(0,0,0,'Ciudad1l');
    nuevaficha.girar();
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha,1,1);
    var nuevaficha = new ObjetoFicha(0,0,0,'Ciudad1l');
    Tablero.colocarficha(nuevaficha,1,2);
    console.log("cierra castillo1: ",Tablero.cierraCastillo(nuevaficha));

    //Prueba de cierra Castillo 2

    Tablero.iniciar();                                                      //      2       1
    var nuevaficha = new ObjetoFicha(0,0,0,'Ciudad1l');                     // --------------------
    nuevaficha.girar();                                                     // -       *-*        -
    Tablero.colocarficha(nuevaficha,2,1);                                   // -   *****-**       -
    var nuevaficha = new ObjetoFicha(0,0,0,'Ciudad2l');                     // -********-*        -
    nuevaficha.girar();                                                     // --------------------
    nuevaficha.girar();                                                     // -********-
    Tablero.colocarficha(nuevaficha,1,1);                                   // -  ***** -
    var nuevaficha = new ObjetoFicha(0,0,0,'Ciudad1l');                     // -        -   
    Tablero.colocarficha(nuevaficha,1,2);                                   // ----------
    console.log("cierra castillo2: ",Tablero.cierraCastillo(nuevaficha));   //      3  

    // Prueba de cierra Castillo 3
    Tablero.iniciar();
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudadext');
//    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha, 4,2);
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudad3l');
    nuevaficha.girar();
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha, 3,2);
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudad2l');
    nuevaficha.girar();
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha, 2,2);
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudad2l');
    nuevaficha.girar();
    nuevaficha.girar();
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha, 2,3);
    var nuevaficha = new ObjetoFicha(0,0,0, 'CiudadE');
    Tablero.colocarficha(nuevaficha, 3,3);
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudad1l');
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha, 4,3);
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudad2l');
    nuevaficha.girar();
    nuevaficha.girar();
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha, 3,4);
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudad1l');
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha, 5,4);
    var nuevaficha = new ObjetoFicha(0,0,0, 'Ciudadext');
    Tablero.colocarficha(nuevaficha, 4,4); 
    console.log("cierra castillo3: ",Tablero.cierraCastillo(nuevaficha));

    //Cierra Claustro con Catedral
  //creamos la lista de jugadores
  
  Tablero.iniciar();
  
  
  Tablero.listaJugadores.push(new ObjetoJugador(123,"Paco",23,1));
  Tablero.listaJugadores.push(new ObjetoJugador(12,"Pepe",88,2));
  Tablero.listaJugadores.push(new ObjetoJugador(45,"Mengano",34,3));
  Tablero.listaJugadores.push(new ObjetoJugador(88,"Fulano",17,4));
  Tablero.listaJugadores.push(new ObjetoJugador(128,"Zutano",12,5));

  Obj=Tablero.listaJugadores;
  console.log("PTS-  j1:",Obj[0].puntos," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);


    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    Tablero.colocarficha(nuevaficha,7,5);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    nuevaficha.girar(); 
    Tablero.colocarficha(nuevaficha,5,4);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha,6,4);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha,6,6);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    nuevaficha.girar();   
    Tablero.colocarficha(nuevaficha,5,6);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
    Tablero.colocarficha(nuevaficha,7,4);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
    nuevaficha.girar(); 
    Tablero.colocarficha(nuevaficha,4,4);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
    nuevaficha.girar(); 
    nuevaficha.girar(); 
    Tablero.colocarficha(nuevaficha,4,6);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
    nuevaficha.girar(); 
    nuevaficha.girar(); 
    nuevaficha.girar(); 
    Tablero.colocarficha(nuevaficha,7,6);
    var nuevaficha = new ObjetoFicha(0,0,0,"Catedral");
    var x = Tablero.colocarficha(nuevaficha,5,5); 
    nuevaficha.seguidores.push({t:"Monje",n:8,j:1,f:x});

    var nuevaficha = new ObjetoFicha(0,0,0,"Catedral");
    Tablero.colocarficha(nuevaficha,6,5); 
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    Tablero.colocarficha(nuevaficha,4,5);
    console.log("cierra claustro: ",Tablero.cierraClaustro(nuevaficha,1));
    console.log("PTS-  j1:",Obj[0].puntos," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos); 


  // Prueba la lista de seguidores.
  Tablero.iniciar();
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	console.log("lista: ", Tablero.colocarseguidor(nuevaficha));
	var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
	console.log("lista: ", Tablero.colocarseguidor(nuevaficha));

	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
  var x=Tablero.colocarficha(nuevaficha,5,5);
	x.seguidores.push({t:"Ladron",n:4,j:1,f:x});  //le metemos ladron
  nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");	
  Tablero.colocarficha(nuevaficha,5,6);
	console.log("cierra camino4: ",Tablero.cierraCamino(nuevaficha));	
	console.log("lista recta con ladron arriba: ", Tablero.colocarseguidor(nuevaficha));
  nuevaficha = new ObjetoFicha(0,0,0,"Tcruce");	
  Tablero.colocarficha(nuevaficha,5,4);
	console.log("lista cruce con ladron arriba: ", Tablero.colocarseguidor(nuevaficha));






/////////////////////////// SIMULACRO PUNTUACIONES CAMINO
  
  Tablero.iniciar();

  //creamos la lista de jugadores
  Tablero.listaJugadores.push(new ObjetoJugador(123,"Paco",23,1));
  Tablero.listaJugadores.push(new ObjetoJugador(12,"Pepe",88,2));
  Tablero.listaJugadores.push(new ObjetoJugador(45,"Mengano",34,3));
  Tablero.listaJugadores.push(new ObjetoJugador(88,"Fulano",17,4));
  Tablero.listaJugadores.push(new ObjetoJugador(128,"Zutano",12,5));
  
  

  Obj=Tablero.listaJugadores;
  console.log("PTS-  j1:",Obj[0].puntos," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);
  

	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	var x=Tablero.colocarficha(nuevaficha,3,1);	
	x.seguidores.push({t:"Ladron",n:4,j:1,f:x});  //le metemos ladron
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,3,2); 
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	x = Tablero.colocarficha(nuevaficha,3,4); 
	x.seguidores.push({t:"Ladron",n:0,j:2,f:x});  //le metemos ladron
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	nuevaficha.girar();
	nuevaficha.girar();
	var nuevaficha = Tablero.colocarficha(nuevaficha,3,5); 
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,3,3);
	console.log("cierraCamino Puntos: ",Tablero.cierraCamino(nuevaficha,1));
	
	console.log("PTS-  j1:",Obj[0].puntos," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);

  Tablero.iniciar();

  //creamos la lista de jugadores
  Tablero.listaJugadores.push(new ObjetoJugador(123,"Paco",23,1));
  Tablero.listaJugadores.push(new ObjetoJugador(12,"Pepe",88,2));
  Tablero.listaJugadores.push(new ObjetoJugador(45,"Mengano",34,3));
  Tablero.listaJugadores.push(new ObjetoJugador(88,"Fulano",17,4));
  Tablero.listaJugadores.push(new ObjetoJugador(128,"Zutano",12,5));

  Obj=Tablero.listaJugadores;
  console.log("PTS-  j1:",Obj[0].puntos,"-",Obj[0].n_seguidores," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);  
    var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
    Tablero.colocarficha(nuevaficha,5,5);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    var x=Tablero.colocarficha(nuevaficha,5,6);
    Tablero.colocaSeguidor(x,{t:"Ladron",n:4,j:1,f:x},Obj[0]);
    console.log("Coloca seguidor-->",Obj[0].n_seguidores,x.seguidores);  //le metemos ladron
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
  nuevaficha.girar();
  Tablero.colocarficha(nuevaficha,4,5);
  var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
  nuevaficha.girar();
   Tablero.colocarficha(nuevaficha,3,5);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
    var x = Tablero.colocarficha(nuevaficha,3,6);
    x.seguidores.push({t:"Ladron",n:0,j:2,f:x},{t:"Granja",n:3,j:2,f:x});  //le metemos ladron
    var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
    nuevaficha.girar();
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha,3,7);
    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
  nuevaficha.girar();
  Tablero.colocarficha(nuevaficha,4,7);
  var nuevaficha = new ObjetoFicha(0,0,0,"Ccruce");
  nuevaficha.girar();

    nuevaficha.girar();
    nuevaficha.girar();
    Tablero.colocarficha(nuevaficha,5,7);
    console.log("cierra camino redondo: ",Tablero.cierraCamino(nuevaficha,1));
    console.log("PTS-  j1:",Obj[0].puntos,"-",Obj[0].n_seguidores," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);
  
    console.log("cierra camino redondo repetido: ",Tablero.cierraCamino(nuevaficha,1));
    console.log("PTS-  j1:",Obj[0].puntos,"-",Obj[0].n_seguidores," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);


  nuevaficha.girar();
  nuevaficha.girar();
  Tablero.colocarficha(nuevaficha,5,7);
  console.log("cierra camino redondo: ",Tablero.cierraCamino(nuevaficha,1));
  console.log("PTS-  j1:",Obj[0].puntos,"-",Obj[0].n_seguidores," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);

  console.log("cierra camino redondo repetido: ",Tablero.cierraCamino(nuevaficha,2));
  console.log("PTS-  j1:",Obj[0].puntos,"-",Obj[0].n_seguidores," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);

*/
 
 
 
 /// Prueba del código de game.js
 
 
 var InicioJuego=function(){       

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
  
  
  
  
  console.log(InicioJuego());
  var robar= Robar();
  console.log(robar);
  var lista=ColocarFicha(12,robar[0],{x:5,y:5},3);
  console.log(lista);
  
  console.log(ColocarSeguidor(12,123, {x:5,y:5}, lista[0]));
  
  
  

/* var robar= Robar();
  console.log(robar);
  console.log(ColocarFicha(12,robar[0],{x:6,y:5},3));
*/
});


