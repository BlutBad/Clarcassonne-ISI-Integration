//Funcion Cierra Castillo



cierraCastillo = function(ficha, flag){

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

        if (final1 != undefined){
            if (((flag == 1) && (final1[0] == true)) || (flag == 2)){
                if (flag == 2)
                    final1[1] = final1[3];
                sumarPuntos(seguidor1, final1[1]);
            }
            // Si hay caballero en el lado [arriba o derecha]
            if (seguidor1.length > 0)
                final1[1] = true;
            else
                final1[1] = false;
            final1[2] = pasado;
        }
        if (final2 != undefined){
            if (((flag == 1) && (final2[0] == true)) || (flag == 2)){
                if (flag == 2)
                    final2[1] = final2[3];
                sumarPuntos(seguidor2, final2[1]);
            }
            // Si hay caballero en el lado [abajo o izquierda]
            if (seguidor2.length > 0)
                final2[1] = true;
            else
                final2[1] = false;
            final2[2] = pasado;
        }

        // Final1 [arriba o derecha], Final2 [izquierda o abajo]
        return [final1, final2];
    }
    else if (unlado.indexOf(ficha.tipo) != -1){
        var final = f_unlado(ficha, 0, seguidor);
        if (((flag == 1) && (final[0] == true)) || (flag == 2)){
            // porque si no es cerrado devuelve [false, caballero, lista, puntos]
            if (flag == 2)
                final[1] = final[3];
            sumarPuntos(seguidor, final[1]);
        }
        if (seguidor.length > 0)
            final[1] = true;
        else
            final[1] = false;
        final[2] = pasado;
        return final;
    }
    else if (maslados.indexOf(ficha.tipo) != -1){
        var final = f_maslados(ficha, 0, seguidor);
        if (((flag == 1) && (final[0] == true)) || (flag == 2)){
            if (flag == 2)
                final[1] = final[3];
            sumarPuntos(seguidor, final[1]);
        }
        if (seguidor.length > 0)
            final[1] = true;
        else
            final[2] = false;
        final[2] = pasado;
        return final;
    }
    else {return false}
  }
