import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import registerApartmentRoutes from './routes/apartment-routes.js';
import Repository from './model/abstract-repository.js';
import fastifyCors from '@fastify/cors';

function registerDefaultHandlers(fastify: Fastify.FastifyInstance){
    return fastify
    .setErrorHandler((error, _, reply) => {
        if(error.statusCode && error.statusCode < 500){
            return reply
            .code(error.statusCode)
            .send(error.message);
        }
        
        fastify.log.error(error);

        reply
        .code(500)
        .send({ message: 'Internal Server Error'});
    })
    .setNotFoundHandler((_, reply) => {
        reply
        .code(418)
        .send();
    });
}

async function registerDB(fastify: Fastify.FastifyInstance){
    await fastify.register(fastifyPostgres, {
        connectionString: process.env.DATABASE_URL
    });
    Repository.pool = fastify.pg.pool;
}

function registerRoutes(fastify: Fastify.FastifyInstance){
    return fastify.register(registerApartmentRoutes, { prefix: '/api/v1/apartment' });
}

async function build(options: object){
    const fastify = Fastify(options);
    await Promise.all([
        fastify.register(fastifyCors, { origin: true }),
        registerDefaultHandlers(fastify),
        registerRoutes(fastify),
        registerDB(fastify)
    ])
    return fastify;
}

export default build;