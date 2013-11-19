var Tiposfichas = {
    Rrecta: { Izq: "Campo", Der: "Campo", Arr: "Rue", Abaj: "Rue", Escudo: 0 }, //8
    Rcurva: {Izq: "Rue", Der: "Campo", Arr: "Campo", Abaj: "Rue", Escudo: 0 }, //9
    Catedral: { Izq: "Campo", Der: "Campo", Arr: "Campo", Abaj: "Campo", Escudo: 0 }, //4
    Posada: {Izq: "Campo", Der: "Campo", Arr: "Campo", Abaj: "Rue", Escudo: 0  }, //2
    Ccruze : { Izq: "Rue", Der: "Rue", Arr: "Rue", Abaj: "Rue", Escudo: 0  }, //1
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
    Ciudad1lcruze: {Izq: "Rue", Der: "Rue", Arr: "Tierra", Abaj: "Rue", Escudo: 0},//3
    Ciudad1ll: { Izq: "Tierra", Der: "Campo", Arr: "Tierra", Abaj: "Campo", Escudo: 0},//2
    Ciudad1l: {Izq: "Campo", Der: "Campo", Arr: "Tierra", Abaj: "Campo", Escudo: 0},//5
	Tcruze:   {Izq: "Rue", Der: "Rue", Arr: "Campo", Abaj: "Rue", Escudo: 0}//4
};

var totalFichas = 72;

var n_fichas = { //72
    Rrecta: 8,
    Rcurva: 9,
    Catedral: 4,
    Posada: 2,
    Ccruze : 1,
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
    Ciudad1lcruze: 3,
    Ciudad1ll: 2,
    Ciudad1l: 5,
	Tcruze: 4,
};

var fichas = [ //72
    'Rrecta',
    'Rcurva',
    'Catedral',
    'Posada',
    'Ccruze',
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
    'CiudadPuertaE',
    'Ciudadext',
    'Ciudad1l2crect',
    'Ciudadcurvder',
    'Ciudadcurvizq',
    'Ciudad1lcruze',
    'Ciudad1ll',
    'Ciudad1l',
	'Tcruze',
];

var lista=[];

var Tablero = new function(){

	this.huecos=[];
	this.candidatos=[];

	this.iniciar = function(){
	  var i=0;
	  for(var x=0;x<10;x++){        //de 10 a 10 para probar (144)
		  for(var y=0;y<10;y++){
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
	    
	  if (!hueco.lleno){
	  
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
<<<<<<< HEAD

=======
      
>>>>>>> 9245c7bbe1df249747dd927d662b053bca82b51e
      return 1;  
	  }
	  else {return 0};
	}
	
/*	this.buscarCandidatos = function(ficha){
	  
	}*/
	
    // Funcion de robar una ficha aleatoria
    this.robarFicha = function(){
      var rand = fichas[Math.floor(Math.random() *fichas.length)];
      console.log("ficha robada: ",rand);
      console.log("numero de esa ficha: ",n_fichas[rand]);
      n_fichas[rand] = n_fichas[rand]-1;
      console.log("numero de esa ficha actual: ",n_fichas[rand]);
      totalFichas--;
      console.log("Total de fichas: ",totalFichas);
      return(Tiposfichas[rand]);
    }
	
};



var ObjetoFicha= function(x,y,i,tipoficha){

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
	this.encaja;

  this.girar=function(){
	var aux= this.arriba;
	this.arriba=this.derecha;
	this.derecha=this.abajo;
	this.abajo=this.izda;
	this.izda=aux;
  }
} 




