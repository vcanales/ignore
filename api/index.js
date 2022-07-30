import { promises as fs } from 'fs';
import path from 'path';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

async function list() {
  const files = await fs.readdir(path.resolve('gitignore'));
  const data = Promise.all(
    files
      .filter((file) => file.endsWith('.gitignore'))
      .map(async (file) => {
        const content = await fs.readFile(
          path.resolve('gitignore', file),
          'utf8'
        );
        return {
          name: file.replace('.gitignore', ''),
          content,
        };
      })
  );

  return data;
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
