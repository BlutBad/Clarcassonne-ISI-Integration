



$(function() {


    //iniciamos el tablero
    Tablero.iniciar();
    
    //comprobamos que efectivamente la coordenada (5,5) es un hueco de ficha vacio. 
    var centro = Tablero.buscarxcoor(5,5);
    console.log(centro.lleno);
    
    //creamos una nueva ficha de tipo Ciudad1l2crect (por ejemplo) sin coordenadas
    var nuevaficha = new ObjetoFicha(0,0,0,"Ciudad1l2crect");
    //comprobamos que los parámetros se han rellenado
    console.log(nuevaficha.tipo,nuevaficha.arriba,nuevaficha.abajo,nuevaficha.izda,nuevaficha.derecha,nuevaficha.escudo);
    
    //La colocamos en el tablero
    
    Tablero.colocarficha(nuevaficha,5,5);
    
    //comprobamos los parametros
    var check= Tablero.buscarxcoor(5,5);
    console.log(check.i,check.tipo,check.arriba,check.abajo,check.izda,check.derecha,check.escudo);
    var check= Tablero.buscarxcoor(5,4);
    console.log(check.i,check.tipo,check.arriba,check.abajo,check.izda,check.derecha,check.escudo);


    var nuevaficha2 = new ObjetoFicha(0,0,0,"Ciudad2lE");
    
//    Tablero.buscarCandidatos(nuevaficha2);

    var robar = new Tablero.robarFicha();
    console.log("objeto tipo de ficha: ",robar);

});
