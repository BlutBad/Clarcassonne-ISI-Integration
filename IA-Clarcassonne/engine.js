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

ObjetoJugador = function(user_id,nombre,edad,n_jugador){
  this.numero=n_jugador;
  this.n_seguidores = 7;
	this.nombre = nombre;
	this.id=user_id;
	this.edad = edad;
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
