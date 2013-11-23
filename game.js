



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


//	totalFichas= 0;
	var robar = new Tablero.robarFicha();
	console.log("objeto tipo de ficha: ",robar);



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
	
	

});
