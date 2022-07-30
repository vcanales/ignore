import { promises as fs } from 'fs';
import path from 'path';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

async function list() {
  return fs.readdir(path.resolve('gitignore'));
}

fastify.get('/', async () => {
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
};

start();
