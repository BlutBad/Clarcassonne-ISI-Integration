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
	 Tcruze: 4
};


var lista=[];

var TableroJuego = new function(){


	this.huecos=[];

	this.iniciar = function(){
	

				for(x=0;x<10;x++){        //de 10 a 10 para probar (144)
					for(y=0;y<10;y++){
						this.huecos.push( new ObjetoHueco(x,y, new ObjetoFicha()));
					}	
				}
	}

};

var ObjetoHueco= function(x,y,ficha){
	this.x=x;
	this.y=y;
	this.ficha=ficha;
}


var ObjetoFicha= function(){
	this.lleno=3;
	
	this.tipo;

	this.arriba;
	this.abajo;
	this.izda;
	this.derecha;

	this.escudo;
	
	this.encaja;
} 


$(function() {
TableroJuego.iniciar();
var cosa=TableroJuego.huecos[2].ficha.lleno;
alert(cosa);
});
