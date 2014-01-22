// if the database is empty on server start, create some sample data.

Meteor.startup(function() {
	console.log(" [Inicializando la Plataforma] ");
 		var partidasV = [];

	    if (Menu.find().count() === 0) {
	    	console.log("\t [1] Creando Menus...");
			var data = [ {
				    name : "Juegos",
				    menuType : "principal",

				}, {
				    name : "Ranking",
				    menuType : "principal",

				}, {
				    name : "Torneos",
				    menuType : "principal",

				},
				//menu de etapas del torneo
				{
				    name : "Participantes",
				    etapa: "participantes",
				    menuType : "torneoEtapas",
				},{
				    name : "Octavos 1/8",
				    etapa: "octavos",
				    menuType : "torneoEtapas",
				},{
				    name : "Cuartos 1/4",
				    etapa: "cuartos",
				    menuType : "torneoEtapas",
				},{
				    name : "Semi-final",
				    etapa: "semifinal",
				    menuType : "torneoEtapas",
				},{
				    name : "Final",
				    etapa: "final",
				    menuType : "torneoEtapas",
				},
				//menu del multi torneo
				{
					name: "Etapas del torneo!",
					short: "etapas", 
					menuType: "multiTorneo",
				},
				{
					name: "Ranking del torneo!",
					short: "ranking", 
					menuType: "multiTorneo",
				},
			
			];

			var timestamp = (new Date()).getTime();
			for ( var i = 0; i < data.length; i++) {
				var obj = {	name 	: data[i].name,
							menuType: data[i].menuType};
				if (data[i].etapa){
					obj.etapa = data[i].etapa;
				}
				if(data[i].short){
					obj.short = data[i].short;
				}
			    var list_id = Menu.insert(obj);
			}
			

		
		fakeUsers = "Inea	Yiey	Eurnu	Anysy	Keel	Bros	Oriso " +
					"Eldd	Iashu	Waiy	Tril	Mosc	Ensh	Quek " +
					"Uere	Thrak	Deic	Ykalo	Uskq	Rhonn	Phauch " +
					"Achl	Yerr	Ydyni	Dieth	Eorme	Thrieph	Thod " +
					"Ormk	Ichao	Irs	Smor	Entht	Verph	Ceum " +
					"Ler	Eseri	Stroegh	Tangh	Liem	Neab	Ourna " +
					"Jik	Oinee	Hish	Oita	Ualey	Easho	Cheuss " +
					"Los	Mork	Ihinu	Maeq	Kalv	Enl	Drauph " +
					"Reyf	Hatm	Aormo	Uendo	Bair	Bok	Rilm " +
					"Aundo	Morl	Echth	Aleq	Atone	Aora	Oero " +
					"Geyn	Tais	Aeste	Whaeth	Uisi	Odene	Ess " +
					"Chad	Dras	Isamu	Adp	Saurr	Ashy	Iradu " +
					"Torq	Adele	Tonl	Yhini	Atsh	Cerc	Ans " +
					"Rayk	Eburu	Meek	Uskt	Rakf	Nysd	Loell " +
					"Pheif	Lit	Aemo	Fays	Obelo	Kimb	Oati " +
					"Ishy	Llierd	Ightgh	Moil	Quoert	Risnt	Yeme " +
					"Reis	Byv	Rher	Cleard	Omck	Yeich	Uinea";
					
		fakeUsersArray = fakeUsers.split("\t");
		fakeUsersId = [];

		console.log("\t [2] Creando "+fakeUsersArray.length +" usuarios falsos");

		for ( var i = 0; i < fakeUsersArray.length; i++) {
		    fakeUser = fakeUsersArray[i];
		    fakeUsersId[i] = Accounts.createUser({
		    	fakeUser : true,
		    	username:fakeUser,
		    	email:(fakeUser+"@pakistan.isi"), 
		    	password:"123"
		    });
		    Meteor.users.update(fakeUsersId[i],
		    	{$set:{fakeUser:true}
		    });
		};

		for (var i = 0; i <= 5; i++) {
			partidasV[i] = {
				creator_id : fakeUsersId[i],
				jugadores : [
					{
						user_id : fakeUsersId[i],
						estado : "Pendiente"
					},
					{
						user_id : fakeUsersId[i+1],
						estado : "Pendiente"
					},
					{
						user_id : fakeUsersId[i+2],
						estado : "Pendiente"
					}
				],
				listos : false,
				torneo_id : false,  
			};
		};
		
		// USUARIOS POR DEFECTOs 
		user = Accounts.createUser({username:"user",email:"user@kaka.aka", password:"123"})
		sara = Accounts.createUser({username:"sara",email:"sara@kaka.aka", password:"123"})
		itzi = Accounts.createUser({username:"itzi",email:"itzi@kaka.aka", password:"123"})
		dany = Accounts.createUser({username:"dany",email:"dany@kaka.aka", password:"123"})		
    }

    if (Menu_user.find().count() === 0) {
		var data = [ {
		    name : "Mi perfil",
		    contents : []
		}, {
		    name : "Buscar usuarios",
		    contents : []
		}, {
		    name : "Amigos",
		    contents : []
		}, ];

		var timestamp = (new Date()).getTime();
		for ( var i = 0; i < data.length; i++) {
		    var list_id = Menu_user.insert({
				name : data[i].name
		    });
		}
    };

    
	if (PartidasVolatiles.find().count() === 0) {  
		console.log("\t [3] Creando "+partidasV.length +" partidas volatiles falsas");
		for (var i = 0; i < partidasV.length; i++) { 
			PartidasVolatiles.insert(
				partidasV[i]
			);
		};
	};

	if (Juegos.find().count() === 0) {

		var admin = Accounts.createUser({username:"admin",email:"admin@kaka.aka", password:"123"});   
		var data = [
			{
			    name : 'AlienInvasion',
			    wrapf : 'null', //'gameAlien.initialize("gamecanvasAlien",spritesAlien,startGameAlien)',
			    logo_src : '/images/games_logo/alieninvasion.jpg',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'alien',
			    mode : 'solo',
			    hall : 'alienHall',
			    rangos : [ {
					rango : "Fantasma",
					minPoints : 0,
			    }, {
					rango : "Noob",
					minPoints : 500,
			    }, {
					rango : "Capitan",
					minPoints : 1000,
			    }, {
					rango : "Comandante",
					minPoints : 4000,
			    }, {
					rango : "General",
					minPoints : 7000,
			    }, {
					rango : "Heroe",
					minPoints : 9000,
			    } ],
			    insignias : [
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 1,
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Has jugado dos veces a este juego",
						timesPlayed : 2,
						insig_image_src : '/insignias/6.jpg'
				    },
				    {
						description : "Has jugado tres veces a este juego",
						timesPlayed : 3,
						insig_image_src : '/insignias/7.jpg'
				    },
				    {
						description : "Has jugado 4 veces a este juego",
						timesPlayed : 4,
						insig_image_src : '/insignias/8.jpg'
				    },
				    {
						description : "Has jugado 5 veces a este juego",
						timesPlayed : 5,
						insig_image_src : '/insignias/9.jpg'
				    }, 
				],
			    torneos : [
				    {
	                    title : "Torneo AlienInvasion", 
	                    date_start : "11/29/2013",
	                    date_finish : "12/29/2013",
	                    pic : '/images/games_logo/alieninvasion.jpg',
	                    description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel',
	                    description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
	                	participantes:[],
	                	etapas : {octavos:{}, cuartos:{}, semifinal:{}, final:{}},
	                }
                ]

			},

			{
			    name : 'Clarcassone',
			    wrapf : 'ClarcassonneGameIU.initialize(idCanvasElement, party_id);',
			    logo_src : '/images/games_logo/clarkasone.jpg',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'klarki',
			    mode : 'multi',
			    hall : 'klarkiHall',
			    rangos : [ {
					rango : "Fantasma",
					minPoints : 0,
			    }, {
					rango : "Noob",
					minPoints : 500,
			    }, {
					rango : "Capitan",
					minPoints : 1000,
			    }, {
					rango : "Comandante",
					minPoints : 4000,
			    }, {
					rango : "General",
					minPoints : 7000,
			    }, {
					rango : "MotherFucker",
					minPoints : 9000,
			    } ],
			    insignias : [
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 1,
						insig_image_src : '/insignias/1.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 2,
						insig_image_src : '/insignias/2.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 3,
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 4,
						insig_image_src : '/insignias/4.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 5,
						insig_image_src : '/insignias/5.jpg'
				    }, 
				],

			    torneos : [ 
					{
                        title : "Torneo Clarcassone", 
                        date_start : "11/29/2013",
                        date_finish : "12/29/2013",
                        pic : '/images/games_logo/clarkasone.jpg',
                        description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel',
                        description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
                        participantes:[],
	                	etapas : {	octavos: 	{start:false,finish:false, maxPlayersNextEtapa: 64, partidas:[]},
	                			 	cuartos: 	{start:false,finish:false, maxPlayersNextEtapa: 16, partidas:[]}, 
	                			 	semifinal: 	{start:false,finish:false, maxPlayersNextEtapa: 4,	partidas:[]},
	                			 	final: 		{start:false,finish:false, maxPlayersNextEtapa: 1000, partidas:[]}},
				}
			    ],
			},

			{
			    name : 'Froot Wars',
			    wrapf : 'null', //'gameFroot.init()',
			    logo_src : '/images/splashscreen.png',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'froot',
			    mode : 'solo',
			    hall : 'frootHall',
			    rangos : [ {
					rango : "Fantasma",
					minPoints : 0,
			    }, {
					rango : "Noob",
					minPoints : 500,
			    }, {
					rango : "Capitan",
					minPoints : 1000,
			    }, {
					rango : "Comandante",
					minPoints : 4000,
			    }, {
					rango : "General",
					minPoints : 7000,
			    }, {
					rango : "Heroe",
					minPoints : 9000,
			    } ],
			    insignias : [
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 1,
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 2,
						insig_image_src : '/insignias/2.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 3,
						insig_image_src : '/insignias/4.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 4,
						insig_image_src : '/insignias/5.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 5,
						insig_image_src : '/insignias/6.jpg'
				    }, ],
			    torneos : [ 
			    	{
                        title : "Torneo Froot War", 
                        date_start : "11/29/2013",
                        date_finish : "12/29/2013",
                        pic : '/images/splashscreen.png',
                        description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel',
                        description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
                        participantes:[],
	                	etapas : {octavos:{}, cuartos:{}, semifinal:{}, final:{}},
                     }
			    ]
			} 
		]

		var timestamp = (new Date()).getTime();
		
		//////////////////////AÑADIR JUEGOS//////////////////////////
		console.log("\t [4] Añadiendo "+data.length +" juegos a la Plataforma");
		console.log("\t\t [4.1] Añadiendo rangos");
		console.log("\t\t [4.2] Añadiendo insignias");
		console.log("\t\t [4.3] Añadiendo torneos");
		for ( var i = 0; i < data.length; i++) {
		    var juego_id = Juegos.insert({
				name : data[i].name,
				wrapf : data[i].wrapf,
				logo_src : data[i].logo_src,
				logo_alt : data[i].logo_alt,
				title_desc : data[i].title_desc,
				description : data[i].description,
				idn : data[i].idn,
				mode : data[i].mode,
				hall : data[i].hall,
		    });

		    
		    //////////////////////RANGOS PARA JUEGOS//////////////////////////
		    //console.log("\t\t [4.1] Añadiendo "+data[i].torneos.length +" rangos");
		    for ( var j = 0; j < data[i].rangos.length; j++) {
				var info = data[i].rangos[j];
				Rangos.insert({
				    game_id : juego_id,
				    rango : info.rango,
				    minPoints : info.minPoints
				});
				timestamp += 1; // ensure unique timestamp.
		    }

		    //////////////////////INSIGNIAS PARA JUEGOS//////////////////////////
		    //console.log("\t\t [4.2] Añadiendo "+data[i].torneos.length +" insignias");
		    for ( var j = 0; j < data[i].insignias.length; j++) {
				var info = data[i].insignias[j];
				Insignias.insert({
				    game_id : juego_id,
				    insig_image_src : info.insig_image_src,
				    description : info.description,
				    timesPlayed : info.timesPlayed,
				});
				timestamp += 1; // ensure unique timestamp.
		    }		    
		    
		    
		    //////////////////////TORNEOS//////////////////////////
		    function ApuntameUsuariosFakes(torneoId) {
				//console.log("Añadiendo usuarios falsos a torneo: " + torneoId);
				fakeUsers = Meteor.users.find({
				    fakeUser : true
				});

				fakeUsers.forEach(function(user) {
				    if (Math.random() < 0.735) {
						Torneos.update(torneoId, { $push : {participantes : user._id}});
				    }
				});
		    }
	
		    
		    //Añadir torneos, enlazando cada torneo con su juego.
		    //console.log("\t\t [4.3] Añadiendo "+data[i].torneos.length +" torneos");
		    for ( var j = 0; j < data[i].torneos.length; j++) {
				var info = data[i].torneos[j];
				var torneoId = Torneos.insert({
				    game_id : juego_id,
				    title : info.title,
				    user_create : admin,
				    date_start : info.date_start,
				    date_finish : info.date_finish,
				    pic : info.pic,
				    description : info.description,
				    description_long: info.description_long,
				    participantes: [],
				    etapas: info.etapas,
				});
				ApuntameUsuariosFakes(torneoId);
		    }
		}
	}
});
