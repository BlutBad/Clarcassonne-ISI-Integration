Tiposfichas = {
    Rrecta: { Izq: "Campo", Der: "Campo", Arr: "Rue", Abaj: "Rue", Escudo: 0 }, //8
    Rcurva: {Izq: "Rue", Der: "Campo", Arr: "Campo", Abaj: "Rue", Escudo: 0 }, //9
    Catedral: { Izq: "Campo", Der: "Campo", Arr: "Campo", Abaj: "Campo", Escudo: 0 }, //4
    Posada: {Izq: "Campo", Der: "Campo", Arr: "Campo", Abaj: "Rue", Escudo: 0  }, //2
    Ccruce : { Izq: "Rue", Der: "Rue", Arr: "Rue", Abaj: "Rue", Escudo: 0  }, //1
    CiudadE: { Izq: "Tierra", Der: "Tierra", Arr: "Tierra", Abaj: "Tierra", Escudo: 1  }, //1
    Ciudad3lc: {Izq: "Tierra", Der: "Tierra", Arr: "Tierra", Abaj: "Rue", Escudo: 0  }, //1
    Ciudad3lcE: {Izq: "Tierra", Der: "Tierra", Arr: "Tierra", Abaj: "Rue", Escudo: 1  },//2
    Ciudad3l: {Izq: "Tierra", Der: "Tierra", Arr: "Tierra", Abaj: "Campo", Escudo: 0  },//3
    Ciudad3lE: {Izq: "Tierra", Der: "Tierra", Arr: "Tierra", Abaj: "Campo", Escudo: 1  },//1
    Ciudad2lc: { Izq: "Tierra", Der: "Rue", Arr: "Tierra", Abaj: "Rue", Escudo: 0 },//3
    Ciudad2lcE: { Izq: "Tierra", Der: "Rue", Arr: "Tierra", Abaj: "Rue", Escudo: 1 },//2
    Ciudad2l: { Izq: "Tierra", Der: "Campo", Arr: "Tierra", Abaj: "Campo", Escudo: 0},//3
    Ciudad2lE: { Izq: "Tierra", Der: "Campo", Arr: "Tierra", Abaj: "Campo", Escudo: 1},//2
    CiudadPuerta: {Izq: "Tierra", Der: "Tierra", Arr: "Campo", Abaj: "Campo", Escudo: 0 },//1
    CiudadPuertaE: {Izq: "Tierra", Der: "Tierra", Arr: "Campo", Abaj: "Campo", Escudo: 1 },//2
    Ciudadext: {Izq: "Tierra", Der: "Tierra", Arr: "Campo", Abaj: "Campo", Escudo: 0},//3
    Ciudad1l2crect: {Izq: "Rue", Der: "Rue", Arr: "Tierra", Abaj: "Campo", Escudo: 0},//4
    Ciudadcurvder: {Izq: "Campo", Der: "Rue", Arr: "Tierra", Abaj: "Rue", Escudo: 0},//3
    Ciudadcurvizq: {Izq: "Rue", Der: "Campo", Arr: "Tierra", Abaj: "Rue", Escudo: 0},//3
    Ciudad1lcruce: {Izq: "Rue", Der: "Rue", Arr: "Tierra", Abaj: "Rue", Escudo: 0},//3
    Ciudad1ll: { Izq: "Tierra", Der: "Campo", Arr: "Tierra", Abaj: "Campo", Escudo: 0},//2
    Ciudad1l: {Izq: "Campo", Der: "Campo", Arr: "Tierra", Abaj: "Campo", Escudo: 0},//5
		Tcruce:   {Izq: "Rue", Der: "Rue", Arr: "Campo", Abaj: "Rue", Escudo: 0},//4
};

var fichas = [ //72
		  'Rrecta', 'Rcurva', 'Catedral',  'Posada', 'Ccruce', 'CiudadE', 'Ciudad3lc', 'Ciudad3lcE', 'Ciudad3l', 'Ciudad3lE', 'Ciudad2lc', 'Ciudad2lcE', 'Ciudad2l', 'Ciudad2lE', 'CiudadPuerta', 'CiudadPuertaE', 'Ciudadext', 'Ciudad1l2crect', 'Ciudadcurvder', 'Ciudadcurvizq','Ciudad1lcruce', 'Ciudad1ll', 'Ciudad1l', 'Tcruce',
];

Tablero = new function(){

	this.totalFichas = 72;

	this.n_fichas = { //72
		  Rrecta: 8,
		  Rcurva: 9,
		  Catedral: 4,
		  Posada: 2,
		  Ccruce : 1,
		  CiudadE: 1,
		  Ciudad3lc: 1,
		  Ciudad3lcE: 2,
		  Ciudad3l:  3,
		  Ciudad3lE: 1,
		  Ciudad2lc: 3,
		  Ciudad2lcE:  2,
		  Ciudad2l: 3,
		  Ciudad2lE: 2,
		  CiudadPuerta: 1,
		  CiudadPuertaE: 2,
		  Ciudadext: 3,
		  Ciudad1l2crect: 4,
		  Ciudadcurvder: 3,
		  Ciudadcurvizq:3,
		  Ciudad1lcruce: 3,
		  Ciudad1ll: 2,
		  Ciudad1l: 5,
		Tcruce: 4,
	};

	this.iniciar = function(){

	  this.huecos=[];
    this.candidatos=[];
    this.listaJugadores=[];
    
    
	  var i=0;
	  this.huecos=[];
	  this.candidatos=[];
	  for(var x=0;x<140;x++){        //de 10 a 10 para probar (144)
		  for(var y=0;y<140;y++){
			  this.huecos.push( new ObjetoFicha(x,y,i));
			  i++;
		  }	
	  }
	}
	
	this.buscarxcoor = function(ox,oy){
	  return ( _.find(this.huecos,function(obj){return (obj.x==ox && obj.y==oy)}));  
	}
	
	this.colocarficha = function(ficha,ox,oy){
	  var hueco = Tablero.buscarxcoor(ox,oy);

	  var encaja = function(){
	    var bien = true;
	    var fichaux = Tablero.buscarxcoor(ox,oy-1);
	    if (fichaux.lleno && fichaux.abajo!=ficha.arriba){bien = false}
	    fichaux = Tablero.buscarxcoor(ox,oy+1);
	    if (fichaux.lleno && fichaux.arriba!=ficha.abajo){bien = false}
	    fichaux = Tablero.buscarxcoor(ox-1,oy);
	    if (fichaux.lleno && fichaux.derecha!=ficha.izda){bien = false}
	    fichaux = Tablero.buscarxcoor(ox+1,oy);
	    if (fichaux.lleno && fichaux.izda!=ficha.derecha){bien = false}
	    return bien;
	  }();
	  
	  if (!hueco.lleno && encaja){
	  
	    //primero rellenamos las coordenadas de la ficha
	    ficha.x=ox;
	    ficha.y=oy;
	    ficha.i=hueco.i;	  
	    //la colocamos en el tablero
	    this.huecos[hueco.i]=ficha;
	    //ponemos el hueco del tablero como lleno
        this.huecos[hueco.i].lleno=true;  
      
      
        /////// borramos el hueco de la lista de candidatos
        var pos = this.candidatos.indexOf( ( _.find(this.candidatos,function(obj){return (obj.x==ox-1 && obj.y==oy)})));
        pos > -1 && this.candidatos.splice( pos,1 );
  
      
        ////// añadimos futuribles huecos posibles a la lista candidatos
        if (!Tablero.buscarxcoor(ox-1,oy).lleno){this.candidatos.push({x:ox-1,y:oy})};
        if (!Tablero.buscarxcoor(ox+1,oy).lleno){this.candidatos.push({x:ox+1,y:oy})};
        if (!Tablero.buscarxcoor(ox,oy-1).lleno){this.candidatos.push({x:ox,y:oy-1})};
        if (!Tablero.buscarxcoor(ox,oy+1).lleno){this.candidatos.push({x:ox,y:oy+1})};
        return ficha;  
	  }
	  else {return 0};
	}
	
	this.buscarCandidatos = function(ficha){
	    var pieza;
 	    var hueco;
	    var encaja=true;

	    for(i=0; i<this.candidatos.length; i++){
		    for(j=0; j<4; j++){
			    encaja=true;
			    pieza=this.candidatos[i];
			    hueco= this.buscarxcoor(pieza.x-1,pieza.y);
			    if (hueco.lleno){
				    if (!(hueco.derecha == ficha.izda)){
			     	    encaja=false;
				    }
			    }

			    hueco= this.buscarxcoor(pieza.x,pieza.y-1);
			    if (hueco.lleno){
				    if (!(hueco.abajo == ficha.arriba)){
			     	    encaja=false;
				    }
			    }

			    hueco= this.buscarxcoor(pieza.x+1,pieza.y);
			    if (hueco.lleno){
				    if (!(hueco.izda == ficha.derecha)){
			     	    encaja=false;
				    }
			    }

			    hueco= this.buscarxcoor(pieza.x,pieza.y+1);
			    if (hueco.lleno){
				    if (!(hueco.arriba == ficha.abajo)){
			     	    encaja=false;
				    }
			    }
			    if (encaja && ficha.encajaCon.indexOf(pieza) == -1){
				    ficha.encajaCon.push(pieza);
			    }
			    ficha.girar();
		    }
	    }
	}


  
// FUNCION CIERRA CAMINO


  this.cierraCamino = function(ficha,flag){

			var cierracamino = ['Ccruce', 'Posada', 'Ciudad3lc', 'Ciudad3lcE', 'Ciudad1lcruce', 'Tcruce'];
			var jugadores=[];
			var fichaorig = ficha;
			var ladron;
			var puntos=0;
			
			var sumarPuntos= function(){
			    yaSumados=[];
			    
          _.each(jugadores, function(seg){
              var jugador= _.find(Tablero.listaJugadores,function(obj){return (obj.numero==seg.j)});
              if (!_.find(yaSumados,function(obj){return (obj==jugador)})){
                  jugador.puntos+=puntos;
                  yaSumados.push(jugador);
              }     
              jugador.n_seguidores++;
              var pos = seg.f.seguidores.indexOf( seg );
              pos > -1 && seg.f.seguidores.splice( pos, 1 );
              
              
          });
                
			    
			}
			
			
			var recursiva = function(ficha,prohibido){
             
              puntos++; 
              
              ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron")});
              if (ladron){jugadores.push(ladron)}
              
							if (ficha.arriba=="Rue" && prohibido!="arriba"){		
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){ 
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"abajo")}
							}
							else if (ficha.abajo=="Rue" && prohibido!="abajo"){
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"arriba")}
							}
							else if (ficha.izda=="Rue" && prohibido!="izquierda"){
									ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"derecha")}
							}
							else if (ficha.derecha=="Rue" && prohibido!="derecha"){
									ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"izquierda")}
							}
					
			}
			
				
			if (cierracamino.indexOf(ficha.tipo) == -1){ //si la ficha no es cierracamino
          //tiene que cerrar camino por dos caminos distintos
          var cerrado=0;   //cerrado tendrá que ser 2
          puntos++;
              
              
          ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron")});
          if (ladron){jugadores.push(ladron)}

	            
	     	  if (ficha.arriba=="Rue" && cerrado<2){		// si hay camino por arriba 
							ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
							//miramos la ficha siguiente, si está llena y cierra camino cerrado +1
							if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
							    puntos++;
							    cerrado++;
								  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
								  if (ladron){jugadores.push(ladron)}
							}
							// si no, recorremos el camino con recursiva

							else if(ficha2.lleno && recursiva(ficha2,"abajo")){cerrado++};							  
									
					  }
					  if (ficha.abajo=="Rue" && cerrado<2){
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  cerrado++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
								    if (ladron){jugadores.push(ladron)}
									}
									else if(ficha2.lleno && recursiva(ficha2,"arriba")){cerrado++};
					  }
					  if (ficha.izda=="Rue" && cerrado<2){
      				  ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  cerrado++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
								  if (ladron){jugadores.push(ladron)}
									}
									else if(ficha2.lleno && recursiva(ficha2,"derecha")){cerrado++};			
					  }
					  if (ficha.derecha=="Rue" && cerrado<2){
									ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  cerrado++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
								    if (ladron){jugadores.push(ladron)}
									}
									else if(ficha2.lleno && recursiva(ficha2,"izquierda")){cerrado++};
					  }
					  if (jugadores.length>0){ladron = true}else{ladron=false}
					  
            if ((flag==1 && cerrado ==2) || flag==2){
                sumarPuntos();
                
            }
            
					  if (cerrado == 2){return [true,ladron]}
					  
					  else {return [false,ladron]}
			}
			else{

				  if (ficha.tipo=="Ccruce" || ficha.tipo=="Tcruce" || ficha.tipo == "Ciudad1lcruce"){
				  puntos++;
				    
				      Cerrado=undefined;
				  
				      if (ficha.arriba=="Rue"){	
				          
				          ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
                  if (ladron){jugadores.push(ladron)}
				          
				          
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por arriba"); 
									    
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
                      if (ladron){jugadores.push(ladron)}
									    
                      sumarPuntos()
                      puntos=1;
                      jugadores=[];									    
									}

									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"abajo");
									    if (Cerrado){
									      console.log("cierra camino (cruce) por arriba");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];	

									}
									else if(ficha2.lleno && flag==2){ 
									  recursiva(ficha2,"abajo");
									  sumarPuntos();
                    puntos=1;	
                    jugadores=[];						  
									} 	
					  }
					  if (ficha.abajo=="Rue"){
					  
					        ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
                  if (ladron){jugadores.push(ladron)}
					  
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por abajo");
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
                      if (ladron){jugadores.push(ladron)}
									    sumarPuntos();
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"arriba");
									    if (Cerrado){
									      console.log("cierra camino (cruce) por abajo");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];

									}
									else if(ficha2.lleno && flag==2){
									  recursiva(ficha2,"arriba");
									  sumarPuntos();
                    puntos=1;	
                    jugadores=[];						  
									}
					  }
					  if (ficha.izda=="Rue"){
					    
					        ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
                  if (ladron){jugadores.push(ladron)}    
					      
      						ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por la izda");
									    
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
                      if (ladron){jugadores.push(ladron)}
									    
									    sumarPuntos();
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"derecha");
									    if (Cerrado){
									      console.log("cierra camino (cruce) por la izda");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && flag==2){
									  recursiva(ficha2,"derecha");
									  sumarPuntos();
                    puntos=1;
                    jugadores=[];							  
									}
					  }
					  if (ficha.derecha=="Rue"){
					  
					        ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
                  if (ladron){jugadores.push(ladron)}
					  
									ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por la dcha");
									    
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
                       if (ladron){jugadores.push(ladron)}
									    
									    sumarPuntos();
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"izquierda");
									    if(Cerrado){
									      console.log("cierra camino (cruce) por la dcha");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && flag==2){
									  recursiva(ficha2,"izquierda");
									  sumarPuntos();
                    puntos=1;
                    jugadores=[];						  
									}
					  }
				  }
				  else{				                      
				    var devuelve= recursiva(ficha,"");
				    if (jugadores.length>0){ladron = true}else{ladron=false}
            if ((flag==1 && devuelve) || flag==2){
                sumarPuntos();
            }
				    return [devuelve,ladron]	  
				   }
			}

	};





  //Funcion Cierra Castillo



  this.cierraCastillo = function(ficha, flag){
    var unlado = [
        'Ciudad1l2crect', 
        'Ciudadcurvder', 
        'Ciudadcurvizq', 
        'Ciudad1lcruce', 
        'Ciudad1ll', // Aunque tenga dos lados con tierra, son cierra campos los dos lados
        'Ciudad1l',
        'Ciudadext' // Aunque tenga dos lados con tierra, son cierra campos los dos lados
    ];

    var maslados = [
        'CiudadE',
        'Ciudad3lc',
        'Ciudad3lcE',
        'Ciudad3l',
        'Ciudad3lE',
        'Ciudad2lc',
        'Ciudad2lcE',
        'Ciudad2l',
        'Ciudad2lE',
        'CiudadPuerta',
        'CiudadPuertaE'
    ];

    var escudo = [
        'Ciudad3lcE',
        'Ciudad3lE',
        'Ciudad2lcE',
        'Ciudad2lE',
        'CiudadPuertaE'
    ]

    var seguidor = [];
    var pasado =[];
    // _.find
    var encontrar = function(lista, obj){
        for(i = 0; i < lista.length; i++){
            if (lista[i] == obj)
                return i;
        }
    }

    // Funcion para sumar los puntos a los jugadores
    var sumarPuntos = function(ObJugador, puntos){
        j1 = 0;
        j2 = 0;
        j3 = 0;
        j4 = 0;
        j5 = 0;
        for(i = 0; i < _.size(ObJugador); i++){
            a =ObJugador[i].j;
            if (a == 1)
                j1++;
            else if(a == 2)
                j2++;
            else if(a == 3)
                j3++;
            else if(a == 4)
                j4++;
            else if(a == 5)
                j5++;
        }
        console.log("j1: ",j1," j2: ",j2);
        var lista = [j1, j2, j3, j4, j5];
        console.log("lista: ",lista);
        var grande = -1;
        for(j=0;j<5;j++){
            // Devuelve la posicion del que tiene mayor numero de caballeros
            var mayor = function(){
                var mayorque = lista[0];
                for(i = 1; i < lista.length; i++){
                    if(lista[i] > mayorque)
                        mayorque = lista[i];
                }
                // la posicion de la lista del que tiene mayor nuemro de caballeros
                devolver = encontrar(lista, mayorque);
                // Cuando no hay caballero en ninguno
                if (mayorque == 0){devolver = undefined}
                // la primera vez que entra y si hay caballero
                else if (grande == -1){
                    grande = mayorque;
                }
                // Si hay otro que tenga el mismo numero de caballeros
                else if (grande == mayorque){grande = grande}
                // para que deje de iterar le asigno undefined
                else{devolver = undefined}
                return devolver;
                
            }
            num = mayor();
            if (num == undefined){break}
            else{
                // Sumar puntos a ese jugador

                Tablero.listaJugadores[num].puntos += puntos;
                Tablero.listaJugadores[num].n_segidores++;
                lista[num] = 0;
                console.log("jugador: ", Tablero.listaJugadores[num].nombre, Tablero.listaJugadores[num].puntos);
            }
        }
    }

    // Funcion cuando es solo un lado
    var f_unlado = function(ficha, puntos, seguidorCa){
        var final = [];
        // Si tiene un escudo suma 1 punto extra
        if (escudo.indexOf(ficha.tipo) != -1){puntos++}
        puntos++;
        // Guardamos la coordenada actual
        pasado.push({x:ficha.x, y:ficha.y});
        console.log(ficha.tipo, ficha.x, ficha.y);
        // Mirar si en la ficha hay un caballero
        caballero = _.find(ficha.seguidores,function(obj){return (obj.t=="Caballero")});
        // Si hay caballero y esa ficha no esta en la lista de seguidores
        if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha)}) == undefined)){
            seguidorCa.push(caballero);
            console.log("seguidorCa: ", seguidorCa);
        }

        if (ficha.arriba == "Tierra"){
            // ficha2 es la ficha de la siguiente posicion
          ficha2 = Tablero.buscarxcoor(ficha.x,ficha.y-1);
            // Cuando no esta en la lista de pasado
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    // Guardamos la siguiente ficha
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    // volvemos a la ficha de atras
                    return f_unlado(ficha, puntos, seguidorCa);
                }
                else if(ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                // Cuando la siguiente ficha esta vacio, devolvemos false
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }
      
      if (ficha.abajo == "Tierra"){
        ficha2 = Tablero.buscarxcoor(ficha.x,ficha.y+1);
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    return f_unlado(ficha, puntos, seguidorCa);
                }
                else if(ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }
      
      if (ficha.izda == "Tierra"){
        ficha2 = Tablero.buscarxcoor(ficha.x-1,ficha.y);
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    return f_unlado(ficha, puntos, seguidorCa);
                }
                else if(ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }
      
      if (ficha.derecha == "Tierra"){
        ficha2 = Tablero.buscarxcoor(ficha.x+1,ficha.y);
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    return f_unlado(ficha, puntos, seguidorCa);
                }
                else if(ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }

        // Volver hacia atrás cuando no puedes segir adelante.
        antes = pasado.indexOf(_.find(pasado ,function(obj){return (obj.x == ficha.x && obj.y == ficha.y)})) - 1;
        // Cuando llegas al punto de inicio y la ciudad esta cerrada cuando devuelve -1.
        if (antes == -1)
            return [true, puntos];
        // reestamos un punto porque volvemos atras, al volver va sumar.
        puntos--;
        ficha3 = Tablero.buscarxcoor(pasado[antes].x, pasado[antes].y);
        if (unlado.indexOf(ficha3.tipo) != -1){return f_unlado(ficha3, puntos, seguidorCa)}
        else if (maslados.indexOf(ficha3.tipo) != -1){return f_maslados(ficha3, puntos, seguidorCa)}
    }

    // Funcion para mas lados
    var f_maslados = function(ficha, puntos, seguidorCa){
        var final = [];
        // Si tiene un escudo suma 1 punto extra
        if (escudo.indexOf(ficha.tipo) != -1){puntos++}
        puntos++;
        // Guardamos la ficha actual a la lista pasada
        pasado.push({x:ficha.x, y:ficha.y});
        console.log(ficha.tipo, ficha.x, ficha.y);
        // Mirar si en la ficha hay un caballero
        caballero = _.find(ficha.seguidores,function(obj){return (obj.t=="Caballero")});
        // Si hay caballero y esa ficha no esta en la lista de seguidores
        if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha)}) == undefined)){
            seguidorCa.push(caballero);
            console.log("seguidorCa: ", seguidorCa);
        }

        if (ficha.arriba == 'Tierra'){
            // ficha2 es la ficha de la siguiente posicion
            ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y-1);
            // Cuando la ficha no esta dentro de la lista pasada
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
                // cuando la siguiente ficha es un cierra castillo
                if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    // guardamos la ficha2 en la lista de pasado
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    // volvemos a la ficha de atras
                    return f_unlado(ficha, puntos, seguidorCa)
                }
                // Cuando la siguiente ficha tiene mas de un lado
                else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                // Cuando la siguiente ficha esta vacion, devolvemos false
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }
        if (ficha.abajo == 'Tierra'){
            ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y+1);
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
                if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    return f_unlado(ficha, puntos, seguidorCa)}
                else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }
        if (ficha.izda == 'Tierra'){
            ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y);
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
                if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    return f_unlado(ficha, puntos, seguidorCa)}
                else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }
        if (ficha.derecha == 'Tierra'){
            ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y);
            if(_.find(pasado ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
                if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                    console.log(ficha2.tipo, ficha2.x, ficha2.y);
                    // Mirar si en la ficha hay un caballero
                    caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                    // Si hay caballero y esa ficha no esta en la lista de seguidores
                    if (caballero && (_.find(seguidorCa ,function(obj){return (obj.f == ficha2)}) == undefined)){
                        seguidorCa.push(caballero);
                        console.log("seguidorCa: ", seguidorCa);
                    }
                    pasado.push({x:ficha2.x, y:ficha2.y});
                    return f_unlado(ficha, puntos, seguidorCa)}
                else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){return f_maslados(ficha2, puntos, seguidorCa)}
                else if(!ficha2.lleno){
                    if (seguidorCa.length > 0)
                        final[1] = true;
                    else
                        final[1] = false;
                    final[0] = false;
                    final[2] = pasado;
                    final[3] = puntos;
                    return final;
                }
            }
        }
        // Volver hacia atrás cuando no puedes segir adelante.
        antes = pasado.indexOf(_.find(pasado ,function(obj){return (obj.x == ficha.x && obj.y == ficha.y)})) - 1;
        // Cuando llegas al punto de inicio y la ciudad esta cerrada cuando devuelve -1.
        if (antes == -1)
            return true;
        puntos--;
        ficha3 = Tablero.buscarxcoor(pasado[antes].x, pasado[antes].y);
        if (unlado.indexOf(ficha3.tipo) != -1){return f_unlado(ficha3, puntos, seguidorCa)}
        else if (maslados.indexOf(ficha3.tipo) != -1){return f_maslados(ficha3, puntos, seguidorCa)}
    }

    // Cuando tenemos dos cierra castillos, primero ir a un lado y luego al otro
    if (ficha.tipo == 'Ciudad1ll' || ficha.tipo == 'Ciudadext'){
        console.log(ficha.tipo, ficha.x, ficha.y);
        if (ficha.arriba == 'Tierra'){
            seguidor1 = [];
            // Mirar si en la ficha hay un caballero
            caballero = _.find(ficha.seguidores,function(obj){return (obj.t=="Caballero")});
            // Si hay caballero y esa ficha no esta en la lista de seguidores
            if (caballero && (_.find(seguidor1 ,function(obj){return (obj.f == ficha)}) == undefined)){
                seguidor1.push(caballero);
                console.log("seguidor: ", seguidor1);
            }
            // ficha2 es la siguiente ficha
            ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y-1);
            // Cuando la siguiente ficha es un cierra castillo y eso cierra un castillo y sumamos 1
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                // Mirar si en la ficha hay un caballero
                caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                // Si hay caballero y esa ficha no esta en la lista de seguidores
                if (caballero && (_.find(seguidor1 ,function(obj){return (obj.f == ficha2)}) == undefined)){
                    seguidor1.push(caballero);
                    console.log("seguidor: ", seguidor1);
                }
                final1 = [true, 2];
            }
            // Cuando la siguiente ficha no es un cierra castillo
            else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){
                var final1 = f_maslados(ficha2, 1, seguidor1);
                final1[1]--;
            }
        }
        if (ficha.abajo == 'Tierra'){
            seguidor2 = [];
            // Mirar si en la ficha hay un caballero
            caballero = _.find(ficha.seguidores,function(obj){return (obj.t=="Caballero")});
            // Si hay caballero y esa ficha no esta en la lista de seguidores
            if (caballero && (_.find(seguidor2 ,function(obj){return (obj.f == ficha)}) == undefined)){
                seguidor2.push(caballero);
                console.log("seguidor: ", seguidor2);
            }
            ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y+1);
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                // Mirar si en la ficha hay un caballero
                caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                // Si hay caballero y esa ficha no esta en la lista de seguidores
                if (caballero && (_.find(seguidor2 ,function(obj){return (obj.f == ficha2)}) == undefined)){
                    seguidor2.push(caballero);
                    console.log("seguidor: ", seguidor2);
                }
                final2 = [true, 2];
            }
            else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){
                var final2 = f_maslados(ficha2, 1, seguidor2);
                final2[1]--;
            }
        }
        if (ficha.izda == 'Tierra'){
            seguidor2 = [];
            // Mirar si en la ficha hay un caballero
            caballero = _.find(ficha.seguidores,function(obj){return (obj.t=="Caballero")});
            // Si hay caballero y esa ficha no esta en la lista de seguidores
            if (caballero && (_.find(seguidor2 ,function(obj){return (obj.f == ficha)}) == undefined)){
                seguidor2.push(caballero);
                console.log("seguidor: ", seguidor2);
            }
            ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y);
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                // Mirar si en la ficha hay un caballero
                caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                // Si hay caballero y esa ficha no esta en la lista de seguidores
                if (caballero && (_.find(seguidor2 ,function(obj){return (obj.f == ficha2)}) == undefined)){
                    seguidor2.push(caballero);
                    console.log("seguidor: ", seguidor2);
                }
                final2 = [true, 2];
            }
            else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){
                var final2 = f_maslados(ficha2, 1, seguidor2);
                final2[1]--;
            }
        }
        if (ficha.derecha == 'Tierra'){
            seguidor1 = [];
            // Mirar si en la ficha hay un caballero
            caballero = _.find(ficha.seguidores,function(obj){return (obj.t=="Caballero")});
            // Si hay caballero y esa ficha no esta en la lista de seguidores
            if (caballero && (_.find(seguidor1 ,function(obj){return (obj.f == ficha)}) == undefined)){
                seguidor1.push(caballero);
                console.log("seguidor: ", seguidor1);
            }
            ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y);
            if (ficha2.lleno && unlado.indexOf(ficha2.tipo) != -1){
                // Mirar si en la ficha hay un caballero
                caballero = _.find(ficha2.seguidores,function(obj){return (obj.t=="Caballero")});
                // Si hay caballero y esa ficha no esta en la lista de seguidores
                if (caballero && (_.find(seguidor1 ,function(obj){return (obj.f == ficha2)}) == undefined)){
                    seguidor1.push(caballero);
                    console.log("seguidor: ", seguidor1);
                }
                final1 = [true, 2];
            }
            else if (ficha2.lleno && maslados.indexOf(ficha2.tipo) != -1){
                var final1 = f_maslados(ficha2, 1, seguidor1);
                final1[1]--;
            }
        }

        if (((flag == 1) && (final1[0] == true)) || (flag == 2))
            if (flag == 2)
                final1[1] = final1[3];
            sumarPuntos(seguidor1, final1[1]);
        if (((flag == 1) && (final2[0] == true)) || (flag == 2))
            if (flag == 2)
                final2[1] = final2[3];
            sumarPuntos(seguidor2, final2[1]);
        // Si hay caballero en el lado [arriba o derecha]
        if (seguidor1.length > 0)
            final1[1] = true;
        else
            final1[1] = false;
        // Si hay caballero en el lado [abajo o izquierda]
        if (seguidor2.length > 0)
            final2[1] = true;
        else
            final2[1] = false;
        final1[2] = pasado;
        final2[2] = pasado;
        // Final1 [arriba o derecha], Final2 [izquierda o abajo]
        return [final1, final2];
    }
    else if (unlado.indexOf(ficha.tipo) != -1){
        var final = f_unlado(ficha, 0, seguidor);
        if (((flag == 1) && (final[0] == true)) || (flag == 2))
            // porque si no es cerrado devuelve [false, caballero, lista, puntos]
            if (flag == 2)
                final[1] = final[3];
            sumarPuntos(seguidor, final[1]);
        if (seguidor.length > 0)
            final[1] = true;
        else
            final[1] = false;
        final[2] = pasado;
        return final;
    }
    else if (maslados.indexOf(ficha.tipo) != -1){
        var final = f_maslados(ficha, 0, seguidor);
        if (((flag == 1) && (final[0] == true)) || (flag == 2))
            if (flag == 2)
                final[1] = final[3];
            sumarPuntos(seguidor, final[1]);
        if (seguidor.length > 0)
            final[1] = true;
        else
            final[2] = false;
        final[2] = pasado;
        return final;
    }
    else {return false}
  }
  // Funcion Cierra Claustro
// Comprueba si tenemos un monje y si esta rodeado un claustro.


  this.cierraClaustro = function(ficha,flag){
		var puntos = 0;
		var monje;

		var sumarpuntos = function(){
	           	var jugador= _.find(Tablero.listaJugadores,function(obj){return (obj.numero==monje.j)});				
							jugador.puntos+=puntos;    
              jugador.n_seguidores++;
              var pos = monje.f.seguidores.indexOf( monje );
              pos > -1 && monje.f.seguidores.splice( pos, 1 );              
		}
                        
			var closeClaustro = function(ficha){
		  	var haymonje = false;
				puntos++;
			  if (_.find(ficha.seguidores,function(obj){return (obj.t=="Monje")})){
	 		   	haymonje=true;
					monje = _.find(ficha.seguidores,function(obj){return (obj.t=="Monje", obj.n==8)});
	 		   }
				var rodeado=0;
					ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y+1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y-1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y+1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y-1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y+1);
				if (ficha2.lleno){puntos++;rodeado++}		
					ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y-1);
				if (ficha2.lleno){puntos++;rodeado++}

			if (flag == 1 || flag == 2){			
				if(rodeado==8 && haymonje == true){             
						sumarpuntos();
						return [true,haymonje];}
				else{
					sumarpuntos();
					return [false,haymonje];}
			}else{return [false,haymonje];}
		}
	
		if ((ficha.tipo == "Catedral") || (ficha.tipo == "Posada")){return closeClaustro(ficha)}
		ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y+1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y-1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y+1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y-1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y+1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
	 	ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y-1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		else{return [false,false,0]}
  }

    // Funcion de robar una ficha aleatoria
    this.robarFicha = function(){
        if(this.totalFichas == 0){return -1}
				else if (this.totalFichas == 72) { var n_rand=17}
				else {var n_rand = Math.floor(Math.random() *fichas.length);}
        var rand = fichas[n_rand];
        console.log("ficha robada: ",rand);
        console.log("numero de esa ficha: ",this.n_fichas[rand]);
        this.n_fichas[rand] = this.n_fichas[rand]-1;
		if (this.n_fichas[rand] == 0){fichas.splice(n_rand,1)}
        console.log("numero de esa ficha actual: ",this.n_fichas[rand]);
        this.totalFichas--;
        console.log("Total de fichas: ",this.totalFichas);
        return rand;
    }

	// Funcion que nos devuelve una lista donde podemos posicionar un seguidor dentro de una ficha.
	this.colocarseguidor = function(ficha){
		seguidor = [];
			var cruces = [
				  'Ccruce',
				  'Ciudad1lcruce',
				  'Tcruce',
			];

				fichacamsig=Tablero.buscarxcoor(ficha.x,ficha.y-1); // ARRIBA
				if (fichacamsig == undefined){tieneladron0 =[false,false]}
				else if (fichacamsig.lleno){tieneladron0 = Tablero.cierraCamino(fichacamsig);}
				else if (!fichacamsig.lleno){tieneladron0 =[false,false]}

				fichacamsig=Tablero.buscarxcoor(ficha.x+1,ficha.y); // DERECHA
				if (fichacamsig == undefined){tieneladron1 =[false,false]}
				else if (fichacamsig.lleno){tieneladron1 = Tablero.cierraCamino(fichacamsig);}
				else if (!fichacamsig.lleno){tieneladron1 =[false,false]}

				fichacamsig=Tablero.buscarxcoor(ficha.x,ficha.y+1);

				if (fichacamsig == undefined){tieneladron2 =[false,false]} //ABAJO
				else if (fichacamsig.lleno){tieneladron2 = Tablero.cierraCamino(fichacamsig);}
				else if (!fichacamsig.lleno){tieneladron2 =[false,false]}

				fichacamsig=Tablero.buscarxcoor(ficha.x-1,ficha.y);
				if (fichacamsig == undefined){tieneladron3 =[false,false]} //IZQUIERDA
				else if (fichacamsig.lleno){tieneladron3 = Tablero.cierraCamino(fichacamsig);}
				else if (!fichacamsig.lleno){tieneladron3 =[false,false]}

		for (i=0;i<=8;i++){

			if (i==0){
				
				if(ficha.arriba == "Rue" ){
						if (cruces.indexOf(ficha.tipo) != -1){ // Si la ficha es un cruce.
							if (tieneladron0[1] == false){seguidor.push({t:"Ladron",n:i});}
								
						}else{
							if(tieneladron0[1] == false && tieneladron1[1] == false && tieneladron2[1] == false && tieneladron3[1] == false){
								seguidor.push({t:"Ladron",n:i});
							}
						}
					
				}else if(ficha.arriba == "Tierra"){
					seguidor.push({t:"Caballero",n:i});			
				}else if(ficha.arriba == "Campo"){
					seguidor.push({t:"Granjero",n:i});
				}
			}
			if (i==1){
				if(ficha.arriba == "Rue" && ficha.derecha == "Rue"){
					seguidor.push({t:"Granjero",n:i});					
				}else if(ficha.arriba == "Tierra" && ficha.derecha == "Rue"){
					seguidor.push({t:"Granjero",n:i});			
				}else if(ficha.arriba == "Tierra" && ficha.derecha == "Campo"){
					seguidor.push({t:"Granjero",n:i});	
				}
			}
			if (i==2){
				if(ficha.derecha == "Rue"){
						if (cruces.indexOf(ficha.tipo) != -1){ // Si la ficha es un cruce.
							if (tieneladron1[1] == false){seguidor.push({t:"Ladron",n:i});}
								
						}else{
							if(tieneladron0[1] == false && tieneladron1[1] == false && tieneladron2[1] == false && tieneladron3[1] == false){
								seguidor.push({t:"Ladron",n:i});
							}
						}				

				}else if(ficha.derecha == "Tierra"){
					seguidor.push({t:"Caballero",n:i});			
				}else if(ficha.derecha == "Campo"){
					seguidor.push({t:"Granjero",n:i});
				}
			}
			if (i==3){
				if(ficha.derecha == "Rue"){
					seguidor.push({t:"Granjero",n:i});					
				}else if(ficha.derecha == "Tierra" && ficha.abajo == "Rue"){
					seguidor.push({t:"Granjero",n:i});			
				}
			}
			if (i==4){
				if(ficha.abajo == "Rue"){
						if (cruces.indexOf(ficha.tipo) != -1){ // Si la ficha es un cruce.
							if (tieneladron2[1] == false){seguidor.push({t:"Ladron",n:i});}
								
						}else{
							if(tieneladron0[1] == false && tieneladron1[1] == false && tieneladron2[1] == false && tieneladron3[1] == false){
								seguidor.push({t:"Ladron",n:i});
							}
						}						
				}else if(ficha.abajo == "Tierra"){
					seguidor.push({t:"Caballero",n:i});			
				}else if(ficha.abajo == "Campo"){
					seguidor.push({t:"Granjero",n:i});
				}
			}
			if (i==5){
				if(ficha.abajo == "Rue"){
					seguidor.push({t:"Granjero",n:i});						
				}
			}
			if (i==6){
				if(ficha.izda == "Rue"){
						if (cruces.indexOf(ficha.tipo) != -1){ // Si la ficha es un cruce.
							if (tieneladron3[1] == false){seguidor.push({t:"Ladron",n:i});}
								
						}else{
							if(tieneladron0[1] == false && tieneladron1[1] == false && tieneladron2[1] == false && tieneladron3[1] == false){
								seguidor.push({t:"Ladron",n:i});
							}
						}				
				}else if(ficha.izda == "Tierra"){
					seguidor.push({t:"Caballero",n:i});			
				}else if(ficha.izda == "Campo"){
					seguidor.push({t:"Granjero",n:i});
				}
			}
			if (i==7){
				if(ficha.izda == "Rue"){
					seguidor.push({t:"Granjero",n:i});						
				}
			}
			if (i==8){
				if(ficha.abajo == "Rue" && ficha.izda == "Campo" && ficha.derecha == "Campo" && ficha.arriba == "Campo"){
					seguidor.push({t:"Monje",n:i});			
				}else if(ficha.abajo == "Campo" && ficha.izda == "Campo" && ficha.derecha == "Campo" && ficha.arriba == "Campo"){			
					seguidor.push({t:"Monje",n:i});	
				}
			}	
		}
		return seguidor;
	}




//Coloca seguidores.

	this.colocaSeguidor = function(ficha,seguidor,Objugador){
		ficha.seguidores.push(seguidor);
		Objugador.n_seguidores--;
	}

};

ObjetoJugador = function(user_id,nombre,fecha,n_jugador){
  this.numero=n_jugador;
  this.n_seguidores = 7;
	this.nombre = nombre;
	this.id=user_id;
	this.edad = function(fecha){
									var dia= fecha.split('/');
									var birthday = +new Date(dia[2],dia[1],dia[0]);
									console.log("ccc",birthday);
									return ~~((Date.now() - birthday) / (31557600000)); // 24*3600*365.25*1000
	}(fecha);
	this.puntos = 0;
	
};


ObjetoFicha= function(x,y,i,tipoficha){

  this.i=i; //nos indica la posición real en la lista tablero
	this.x=x; // x e y nos indican la posición 
	this.y=y; // ficticia en el tablero virtual


	this.lleno=false;
	
	this.tipo=tipoficha;
	
    if (this.tipo){

        this.arriba = Tiposfichas[this.tipo].Arr;
        this.abajo = Tiposfichas[this.tipo].Abaj;
        this.izda = Tiposfichas[this.tipo].Izq;
        this.derecha = Tiposfichas[this.tipo].Der;

        this.escudo=Tiposfichas[this.tipo].Escudo;
    }

    this.encajaCon=[];

    this.girar=function(){  //Gira en el sentido contrario de las agujas del reloj
        var aux= this.arriba;
        this.arriba=this.derecha;
        this.derecha=this.abajo;
        this.abajo=this.izda;
        this.izda=aux;
    }
    this.n_giros;
    this.seguidores=[];
}

