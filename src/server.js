const Hapi = require('@hapi/hapi'),
	routes = require('./routes'),
	init = async () => {
		const server = Hapi.server({
			port: 5000,
			host: 'localhost',
			routes: {
				cors: {
					origin: ['*'],
				}
			}
		});

		server.route(routes);

		await server.start();
		console.log(server.info.uri);
	};

init();