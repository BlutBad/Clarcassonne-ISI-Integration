// if the database is empty on server start, create some sample data.
Meteor
	.startup(function() {
	    if (Menu.find().count() === 0) {
		var data = [ {
		    name : "Juegos",
		    contents : []
		}, {
		    name : "Ranking",
		    contents : []
		}, {
		    name : "Torneos",
		    contents : []
		}, {
		    name : "Comunidad",
		    contents : []
		}, ];

		var timestamp = (new Date()).getTime();
		for ( var i = 0; i < data.length; i++) {
		    var list_id = Menu.insert({
			name : data[i].name
		    });
		}
	    }

	    if (Menu_user.find().count() === 0) {
		var data = [ {
		    name : "Mi perfil",
		    contents : []
		}, {
		    name : "Mi clan",
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
	    }

	    if (Juegos.find().count() === 0) {
		var data = [
			{
			    name : 'AlienInvasion',
			    wrapf : 'gameAlien.initialize("gamecanvasAlien",sprites,startGame)',
			    logo_src : '/images/games_logo/alieninvasion.jpg',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'alien',
			    mode : 'solo',
			    hall : 'alienHall',
			    rangos : [ {
				rango : "Fantasma",
				minPoints : -1,
			    }, {
				rango : "Noob",
				minPoints : -0.1,
			    }, {
				rango : "Capitan",
				minPoints : 999,
			    }, {
				rango : "Comandante",
				minPoints : 3999,
			    }, {
				rango : "General",
				minPoints : 70000,
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
				    }, ]
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
				minPoints : -1,
			    }, {
				rango : "Noob",
				minPoints : 0,
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
				    }, ]
			},

			{
			    name : 'Froot Wars',
			    wrapf : 'gameFroot.init()',
			    logo_src : '/images/games_logo/frootwars.jpg',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'froot',
			    mode : 'solo',
			    hall : 'frootHall',
			    rangos : [ {
				rango : "Fantasma",
				minPoints : -1,
			    }, {
				rango : "Noob",
				minPoints : 0,
			    }, {
				rango : "Capitan",
				minPoints : 1000,
			    }, {
				rango : "Comandante",
				minPoints : 4000,
			    }, {
				rango : "General",
				minPoints : 70000,
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
				    }, ]
			},
		/*
		 * { name : 'Dummy1', wrapf : 'dummyG1', logo_src :
		 * '/images/games_logo/d1.jpeg', logo_alt : 'Juega es este
		 * juego', title_desc : 'Titulo para la descripcion del juego',
		 * description : 'Descripcion del juego!' }, { name : 'Dummy2',
		 * wrapf : 'dummyG2', logo_src : '/images/games_logo/d2.jpg',
		 * logo_alt : 'Juega es este juego', title_desc : 'Titulo para
		 * la descripcion del juego', description : 'Descripcion del
		 * juego!' }, { name : 'Dummy3', wrapf : 'dummyG3', logo_src :
		 * '/images/games_logo/d3.jpg', logo_alt : 'Juega es este
		 * juego', title_desc : 'Titulo para la descripcion del juego',
		 * description : 'Descripcion del juego!' }, { name : 'Dummy4',
		 * wrapf : 'dummyG4', logo_src : '/images/games_logo/d4.jpg',
		 * logo_alt : 'Juega es este juego', title_desc : 'Titulo para
		 * la descripcion del juego', description : 'Descripcion del
		 * juego!' }
		 */
		];
		/*
		 * for (var i = 0; i < data.length; i++) { var list_id =
		 * Juegos.insert(data[i]); }
		 */
		var timestamp = (new Date()).getTime();
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

		    for ( var j = 0; j < data[i].rangos.length; j++) {
			var info = data[i].rangos[j];
			Rangos.insert({
			    game_id : juego_id,
			    rango : info.rango,
			    minPoints : info.minPoints
			});
			timestamp += 1; // ensure unique timestamp.
		    }

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

		}
	    }

	    // Crear unos cuantos usuarios falsos, para poder crear partidas de
	    // los judarores que se apunten al torneo.
	    fakeUsers = "Cheyrd_Inaurtle Oechi_Honomon Saml_Rodizard Ineh_Lorochu Tand_Knockeromon Quaq_Vorizard Elms_Kimizard Kell_Clotachu Cond_Aughamon Umy_Clotizard Lorrt_Denamon Scheas_Rodertle Ekalu_Goofortle Yinao_Sulachu Skeln_Wadezard Geal_Thimbleortle Schein_Snarkyzard Vun_Twerpirtle Oskelo_Thimbleechu Edyne_Undartle Yagea_Perozard Ros_Ashertle Erise_Ageychu Eingo_Faceemon Dars_Ardartle Clur_Twitymon Seev_Tasurtle Siy_Goofirtle Rayt_Numbachu Laeg_Boneurtle Ahini_Fumbleumon Inalo_Bumbleichu Wheuv_Footezard Tait_Ormichu Llaunt_Onartle Imy_Clodamon Osf_Wimpezard Chagh_Meatomon Rhey_Skullumon Shaid_Etochu Ett_Osymon Urado_Faceurtle Oite_Torichu Chrent_Faceomon Uma_Bumbleamon Ess_Ghaozard Aunta_Dumbyrtle Tanf_Loafechu Apere_Chauzard Oete_Footachu Ghat_Puffemon Luiz_Knuckleimon Uworo_Dipazard Avori_Untuzard Quek_Skeluchu Atnt_Angazard Ianga_Ballemon Reyd_Sulirtle Phew_Headazard Undn_Puffozard Orilu_Iamon Isk_Faceychu Ustn_Undyzard Suls_Twerpemon Eldrd_Draemon Yrano_Kimachu Nysr_Adochu Emc_Goofurtle Auski_Doofemon Eorma_Raymon Uemu_Ballomon Cheet_Sneezeamon Schiech_Tonuzard Irph_Ineertle Died_Numbuchu Ads_Ineamon Ymore_Ormazard Itb_Turychu Oathi_Imazard Iryni_Wadozard Ward_Denertle Weyk_Therortle Wark_Rayemon Inala_Oldemon Heik_Risamon Yieg_Verirtle Ads_Fingerozard Oia_Cloduzard Lab_Leromon Zhiec_Ustumon Bin_Enumon Rab_Nyurtle Lyenn_Doofychu Urnch_Knockizard Unyu_Atemon Atd_Wipeozard Nyv_Headortle Zhok_Boneortle Sayf_Enimon Thier_Ackortle Leis_Skelichu Gaiv_Thimbleizard Eemi_Bumbleirtle Quel_Wimpechu Ehini_Ghauchu Urilo_Boneichu Eml_Sneezeochu Ykimu_Oldimon Olyea_Airomon Emst_Inaymon Driel_Skullochu Reinn_Headyrtle Llooc_Sayachu Queal_Ankleazard Dais_Nyozard Samw_Draichu Zhoph_Faceachu Rakk_Echomon Osere_Lunkuchu";
	    fakeUsersArray = fakeUsers.split(" ");

	    if (Torneos.find().count() === 0) {
		var data = [
			{
			    title : "Torneo AlienInvasion",
			    game : 'AlienInvasion',
			    user_create : 'pepito_grillo',
			    date_start : "11/29/2013",
			    date_finish : "12/29/2013",
			    pic : '/images/games_logo/alieninvasion.jpg',
			    description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
			},
			{
			    title : "Torneo Clarcassone",
			    game : 'Clarcassone',
			    user_create : 'pepito_grillo',
			    date_start : "11/29/2013",
			    date_finish : "12/29/2013",
			    pic : '/images/games_logo/clarkasone.jpg',
			    description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
			},

			{
			    title : "Torneo Froot War",
			    game : 'Froot Wars',
			    user_create : 'pepito_grillo',
			    date_start : "11/29/2013",
			    date_finish : "12/29/2013",
			    pic : '/images/games_logo/frootwars.jpg',
			    description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
			} ];

		for ( var i = 0; i < data.length; i++) {
		    var list_id = Torneos.insert(data[i]);
		}
	    }
	});
