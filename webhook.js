'use strict';

const fastify = require('fastify');

const webhook = fastify({
	logger: false
});

webhook.get('/', (request, reply) => {
	reply.send({
		msg: 'Webhook server'
	});
});

webhook.post('/callback', (request, _) => {
	const {msg} = request.body;
	console.log(msg);
});

webhook.listen(8000, '127.0.0.1', err => {
	if (err) {
		throw err;
	}
	console.log('webhook running on 8000');
});
