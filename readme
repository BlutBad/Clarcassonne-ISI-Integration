
Plataphorma BlutBad
=============================

---
## Información General
[Deploy de la Plataforma BlutBad](http://blutbad.meteor.com/ "Deploy de la Plataforma BlutBad")
[Deploy de la Plataforma Lowerlayers](http://lowerlayers.meteor.com/ "Plataforma de Juegos LowerLayers")


---
[Plataforma de Juegos BlutBad](https://github.com/BlutBad/ISI-Clarcassonne-PL "Plataforma de Juegos BlutBad")
[Clarcassonne Interfaz de Usuario](https://github.com/locobiedma/iu_carcassone "Clarcassonne UI")
[Clarcassonne Inteligencia Artificial](https://github.com/ciglesiasgo/IA-Carcassonne "Clarcassonne IA")

---
[Dudas, preguntas y sugerencias sobre la API y Plataforma](https://github.com/BlutBad/ISI-Clarcassonne-PL/issues "Dudas, preguntas y sugerencias")
---

_________________________________________________________________________________
## API entre IA, IU y PL
---
### El protocolo de partidas
1. En la plataforma: 
⋅⋅* Los usuarios que desean jugar forma grupos de 4-6 jugadores y cuando estan listos inician la partida.
⋅⋅* Se crea una partida con la siguiente estructuda de datos:
```
Partidas.insert({
                jugadores : [ {user_id: 11111, etc: etc},
                              {user_id: 22222, etc: etc}, ... ],
                terminada: false,
                });
```
2. Se llama a las funciones de inicializacion de IA e IU. 

⋅⋅* Inicializacion de IA
``` 
ClarcassonneGameIA.iniciar(party_id);
    party_id - _id de la partida que va a jugar el usuario en cuestion, el que esta ejecutando ese codigo en su browser.
```
    
⋅⋅* Inicializacion de IU
```
ClarcassonneGameIU.initialize(idCanvasElement, sprite_url, callback, party_id);

idCanvasElement  - El #id del canvas donde se va iniciar el juego
sprite_url       - Url del spritesheet del juego(ej: '/images/ClarcassonneSpriteSheet.png').
callback         - Función de inicio del juego despues de que se ha finalizado 'initialize'.
party_id         - _id de la partida que va a jugar el usuario en cuestion, el que esta ejecutando ese codigo en su browser.
```
3. 'ClarcassonneGameIA' decide quien empieza la partida y escribe esa información en 'turnos':

```             
Partidas.update(party_id, {
                            $push : {turnos : [11111, 22222,...]}
                          });
```
4. 'ClarcassonneGameIU' lee el moviento del usuario y lo apunta el la collection:

```             
Partidas.update(party_id, {
                            $push : {movimientos : [{user_id: 11111, action:{}},
                                                    {user_id: 22222, action:{}},...]}
                          });
```
5. Se repiten puntos 3-4 hasta que la partida termine.
IA e IU hacen polling sobre la collection para ver si hay nuevas entras que les corresponden, filtando por `party_id` y comparando ultima entrada.



6. Partida ha terminado
```             
Partidas.update(party_id, {
                            $push : {puntuacion : [ {user_id: 11111, puntos : over9000},
                                                    {user_id: 22222, puntos : over9900},...]},
                            $set  : {terminada: true}
                });
```
6. LLama a `partyFinish` con el `party_id`, y la plataforma se ocupa de meter
 a cada usuario con su puntuacion corespondiente a la collection del Ranking. 
---

### Coleciones en disponibles para la IU y IA:
1. Partidas
```
//Para guardar las partidas y la información de ellas.
Partidas = new Meteor.Collection('partidas');
```
---
⋅⋅* Estructura de una partida:
```
{   "_id"       : ObjectId("..."),
    turnos      : [ 11111, 22222,...],
    movimientos : [ {user_id: 11111, action:{}},
                    {user_id: 22222, action:{}},...],
    puntuacion  : [ {user_id: 11111, puntos : over9000},
                    {user_id: 22222, puntos : over9900},...],
    terminada   : true                          
}                                                     
```

---
### Ventajas de usar esta API
1. Queda un registro de cada partida, facil de recuperar las paridas en la que ha jugado un usuario.
2. Se puede restablecer una partida no terminada, ver si todos los integrantes estan online para ofrecerles terminar esa partida.
3. Meter a observadores en la partida.
4. Un usuario puede juegar varias partidas a la vez.
5. Una partida asincrona, es decir un usuario hace un movimiento y se sale del juego, msa tarde entra para hacer su moviento si le toda el turno y vulve a salir, como en ajedrez.
6. Parece facil e intuitivo, nada de llamadas remotas.

---
---
## Info de Servicio
1.Como hacer Deploy:
⋅⋅*meteor deploy --delete http://blutbad.meteor.com/
⋅⋅*meteor deploy http://blutbad.meteor.com

2.Editar ReadMe:
[Como editar rearme(Markdown Cheatsheet)](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-lists "Markdown Cheatsheet")

