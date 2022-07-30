import { promises as fs } from 'fs';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

async function list() {
	const dirs = await fs.readdir('./gitignore');
	
	return dirs;
}

fastify.get('/', async (request, reply) => {
	const data = await list();
	return { data };
});

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

start();
