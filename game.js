



$(function() {


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
	Tablero.colocarficha(nuevaficha,3,1);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,3,2); 
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,3,3); 
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	nuevaficha.girar();
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,3,4); 
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
	Tablero.cierraCamino(nuevaficha);
	
	//Prueba cierraCamino colocando ficha intermedia
	Tablero.iniciar();
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	Tablero.colocarficha(nuevaficha,8,1);
	var nuevaficha = new ObjetoFicha(0,0,0,"Posada");
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,7,3);
	ficha2=Tablero.buscarxcoor(7,3);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
	nuevaficha.girar();
	nuevaficha.girar();
	nuevaficha.girar();
	Tablero.colocarficha(nuevaficha,8,3);
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	Tablero.colocarficha(nuevaficha,8,2); 
	console.log("cierra camino2: ",Tablero.cierraCamino(nuevaficha));
	
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
	console.log("si encaja 1:",Tablero.colocarficha(nuevaficha,8,2));              //Deberia encajar ----> devuelve 1


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

// Prueba la lista de seguidores.
	Tablero.iniciar();
	var nuevaficha = new ObjetoFicha(0,0,0,"Rrecta");
	console.log("lista: ", Tablero.colocarseguidor(nuevaficha));
	var nuevaficha = new ObjetoFicha(0,0,0,"Rcurva");
	console.log("lista: ", Tablero.colocarseguidor(nuevaficha));
	var nuevaficha = new ObjetoFicha(0,0,0,"Ccruce");
	console.log("lista: ", Tablero.colocarseguidor(nuevaficha));

});
