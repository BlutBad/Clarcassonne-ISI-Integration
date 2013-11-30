// if the database is empty on server start, create some sample data.
Meteor.startup(function() {
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
				for (var i = 0; i < data.length; i++) {
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
					name : "Configuración de mi cuenta",
					contents : []
				}, ];

				var timestamp = (new Date()).getTime();
				for (var i = 0; i < data.length; i++) {
					var list_id = Menu_user.insert({
						name : data[i].name
					});
				}
			}

			if (Juegos.find().count() === 0) {
				var data = [ {
					name : 'AlienInvasion',
					wrapf : 'gameAlien.initialize("gamecanvasAlien",sprites,startGame)',
					logo_src : '/images/games_logo/alieninvasion.jpg',
					logo_alt : 'Juega es este juego',
					title_desc : 'Titulo para la descripcion del juego',
					description : 'Descripcion del juego!',
					idn: 'alien'
				},
				{
					name : 'Clarcassone',
					wrapf : 'clarki',
					logo_src : '/images/games_logo/clarkasone.jpg',
					logo_alt : 'Juega es este juego',
					title_desc : 'Titulo para la descripcion del juego',
					description : 'Descripcion del juego!',
					idn: ''
				},

				{
					name : 'Froot Wars',
					wrapf : 'gameFroot.init()',
					logo_src : '/images/games_logo/frootwars.jpg',
					logo_alt : 'Juega es este juego',
					title_desc : 'Titulo para la descripcion del juego',
					description : 'Descripcion del juego!',
					idn: 'froot'
				},
/*
				{
					name : 'Dummy1',
					wrapf : 'dummyG1',
					logo_src : '/images/games_logo/d1.jpeg',
					logo_alt : 'Juega es este juego',
					title_desc : 'Titulo para la descripcion del juego',
					description : 'Descripcion del juego!'
				}, {
					name : 'Dummy2',
					wrapf : 'dummyG2',
					logo_src : '/images/games_logo/d2.jpg',
					logo_alt : 'Juega es este juego',
					title_desc : 'Titulo para la descripcion del juego',
					description : 'Descripcion del juego!'
				}, {
					name : 'Dummy3',
					wrapf : 'dummyG3',
					logo_src : '/images/games_logo/d3.jpg',
					logo_alt : 'Juega es este juego',
					title_desc : 'Titulo para la descripcion del juego',
					description : 'Descripcion del juego!'
				}, {
					name : 'Dummy4',
					wrapf : 'dummyG4',
					logo_src : '/images/games_logo/d4.jpg',
					logo_alt : 'Juega es este juego',
					title_desc : 'Titulo para la descripcion del juego',
					description : 'Descripcion del juego!'
				}
				*/];

				for (var i = 0; i < data.length; i++) {
					var list_id = Juegos.insert(data[i]);
				}
			}

			if (Torneos.find().count() === 0) {
				var data = [
						{
							title : "Torneo AlienInvasion",
							game : 'AlienInvasion',
							user_create: 'pepito_grillo',
							date_start : "11/29/2013",
							date_finish : "12/29/2013",
							pic : '/images/games_logo/alieninvasion.jpg',
							description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
						},
						{
							title : "Torneo Clarcassone",
							game : 'Clarcassone',
							user_create: 'pepito_grillo',
							date_start : "11/29/2013",
							date_finish : "12/29/2013",
							pic : '/images/games_logo/clarkasone.png',
							description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
						},

						{
							title : "Torneo Froot War",
							game : 'Froot War',
							user_create: 'pepito_grillo',
							date_start : "11/29/2013",
							date_finish : "12/29/2013",
							pic : '/images/games_logo/frootwars.jpg',
							description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
						} ];

				for (var i = 0; i < data.length; i++) {
					var list_id = Torneos.insert(data[i]);
				}
			}
		});
