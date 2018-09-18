'use strict';

const got = require('got');
const fastify = require('fastify');

const server = fastify({
	logger: false
});

server.get('/', (request, reply) => {
	reply.send({
		msg: 'Main server'
	});
});

server.post('/webhook', (request, reply) => {
	got.post('http://127.0.0.1:8000/callback', {
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			msg: `${request.body.name} has been sent from server`
		})
	}).then(_ => {
		reply.send({
			status: 'success',
			msg: `User ${request.body.name} inserted`
		});
	}).catch(err => {
		reply.send({
			status: 'error',
			msg: JSON.stringify(err)
		});
	});
});

server.listen(3000, '127.0.0.1', err => {
	if (err) {
		throw err;
	}
	console.log('server running on 3000');
});
