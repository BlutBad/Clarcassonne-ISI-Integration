// Jugador máquina

jugadorIA=function(nJugador){


  //Robamos la nueva ficha.
  this.robar = function(){
          var robado=Tablero.robarFicha(); 
          this.nuevaficha = new ObjetoFicha(0,0,0,robado);
          Tablero.buscarCandidatos(this.nuevaficha);
          if (nuevaficha.encajaCon.length==0 && Tablero.totalFichas != 71){this.robar()}
           //else {console.log('encajaCon',this.nuevaficha.encajaCon)};
          //71 porque ya hemos restado 1 al llamar a Tabler.robarFicha()
  };
  this.robar();
        
  
  
  
  var colocarFicha =  function(ngiros){
       // console.log('colocar-giros',ngiros);
        TableroAux = new ObjTablero(12312);
        TableroAux.iniciar();
        // Salvamos la lista de huecos.
        for (i in Tablero.huecos){
          if (Tablero.huecos[i].lleno){TableroAux.huecos[i]=Tablero.huecos[i]}
        }
        // Salvamos la lista de candidatos.
        for (i in Tablero.candidatos){TableroAux.candidatos[i]=Tablero.candidatos[i]}
        // Salvamos los puntos de los jugadores. 
        listaPuntos=[]
        for (i in Tablero.listaJugadores){         
          listaPuntos.push(Tablero.listaJugadores[i].puntos);
        }
        
        
        
        
          
        // colocamos la ficha para probar si es la mejor jugada.
        var colocado = Tablero.colocarficha(nuevaficha,this.nuevaficha.encajaCon[cont].x,this.nuevaficha.encajaCon[cont].y);
        if (colocado){
            var seguidores= [];
          
            var Jugador = _.find(Tablero.listaJugadores,function(obj){return (obj.numero == nJugador)})
   


            // Comprobamos los puntos conseguidos y los comparamos, si son mejores nos quedaremos con esta jugada
            
            
            cierraCamino(colocado,1);
            cierraClaustro(colocado,1);
            cierraCastillo(colocado,1);       
            var jugador= _.find(Tablero.listaJugadores,function(obj){return (obj.id.user_id==nJugador)});
            if (jugador.puntos >= jugada.puntos){
                jugada={
                  puntos:jugador.puntos,
                  coorx:this.nuevaficha.encajaCon[cont].x,
                  coory:this.nuevaficha.encajaCon[cont].y,
                  giros:ngiros,
                }
               // console.log(this.nuevaficha,jugada);
            }
            
            
            
            // Recuperamos los valores originales. 
            var encajacon = nuevaficha.encajaCon;
            this.nuevaficha = new ObjetoFicha(0,0,0,nuevaficha.tipo);
            nuevaficha.encajaCon=encajacon;  
            Tablero.huecos = TableroAux.huecos;
            Tablero.candidatos = TableroAux.candidatos;
            
            for (i in Tablero.listaJugadores){  
              Tablero.listaJugadores[i].puntos=listaPuntos[i];
            }
        }
  }
  
  
  
  var jugador= _.find(Tablero.listaJugadores,function(obj){return (obj.numero==nJugador)});
 
  
        
  //Buscamos de todas las jugadas posibles la que más puntos nos da. 
  //Realizamos todos los cálculos sobre un tablero auxiliar.
    
  var jugada={
    puntos:0,
    coorx:0,
    coory:0,
    giros:0,   
  }
                          

  //Probaremos con todas las fichas de que encajan con la ficha. 
  for (cont in this.nuevaficha.encajaCon){
    
    /*/Probaremos con las cuatro orientaciones posibles. 
    for (var k=0;k<4;k++){
        if(k){
          for (var n=0; n<k; n++){
            nuevaficha.girar(k);
          }    
        }    
        colocarFicha(k);
    }*/
    //console.log('0000000000',this.nuevaficha);
    colocarFicha(0);
     
    this.nuevaficha.girar();
    //console.log('1111111111',this.nuevaficha);
    colocarFicha(1);  
    
    
    
    this.nuevaficha.girar();
    this.nuevaficha.girar();
    //console.log('2222222222222',this.nuevaficha);
    colocarFicha(2);  
    
    this.nuevaficha.girar();
    this.nuevaficha.girar();
    this.nuevaficha.girar();
    //console.log('3333333333333',this.nuevaficha);
    colocarFicha(3);
  } 

 
  return [this.nuevaficha.tipo, jugada]


}
