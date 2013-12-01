



$(function() {


	//iniciamos el tablero
	Tablero.iniciar();
/*
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

*/
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
    Tablero.iniciar();
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
    nuevaficha.seguidores.push({t:"Monje",n:8});
    Tablero.colocarficha(nuevaficha,5,5); 
//    var nuevaficha = new ObjetoFicha(0,0,0,"Catedral");
//    Tablero.colocarficha(nuevaficha,6,5); 
//    var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
//    Tablero.colocarficha(nuevaficha,4,5);
    console.log("cierra claustro: ",Tablero.cierraClaustro(nuevaficha));
    

/*
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





*/
/////////////////////////// SIMULACRO PUNTUACIONES CAMINO


  Tablero.listaJugadores.push(new ObjetoJugador("Paco",23,1));
  Tablero.listaJugadores.push(new ObjetoJugador("Pepe",88,2));
  Tablero.listaJugadores.push(new ObjetoJugador("Menganito",34,3));
  Tablero.listaJugadores.push(new ObjetoJugador("Fulanito",12,4));

  Obj=Tablero.listaJugadores;
  console.log("PTS-  j1:",Obj[0].puntos," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);
  
  Tablero.iniciar();
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

  Tablero.listaJugadores=[];

  Tablero.listaJugadores.push(new ObjetoJugador("Paco",23,1));
  Tablero.listaJugadores.push(new ObjetoJugador("Pepe",88,2));
  Tablero.listaJugadores.push(new ObjetoJugador("Menganito",34,3));
  Tablero.listaJugadores.push(new ObjetoJugador("Fulanito",12,4));

  Obj=Tablero.listaJugadores;
  console.log("PTS-  j1:",Obj[0].puntos,"-",Obj[0].n_seguidores," j2:",Obj[1].puntos," j3:",Obj[2].puntos," j4:",Obj[3].puntos);
    Tablero.iniciar();   
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

});


