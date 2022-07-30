import { promises as fs } from 'fs';
import path from 'path';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const fastify = Fastify({ logger: true });

fastify.register(fastifyStatic, {
  root: path.resolve('web', 'public'),
});

async function list() {
  const dirs = await fs.readdir(path.resolve('gitignore'));
  return dirs;
}

fastify.get('/api', async () => {
  const data = await list();

  return { data };
});

fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
