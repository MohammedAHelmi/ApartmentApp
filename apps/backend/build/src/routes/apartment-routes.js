import { getApartmentHandler, getApartmentOptions } from "../controllers/get-apartment-handler.js";
import { addApartmentHandler, addApartmentOptions } from "../controllers/add-apartment-handler.js";
import { listApartmentsHandler, listApartmentsOptions } from "../controllers/list-apartments-handler.js";
function registerApartmentRoutes(fastify, _, done) {
    fastify.get('/list', listApartmentsOptions, listApartmentsHandler);
    fastify.post('/add', addApartmentOptions, addApartmentHandler);
    fastify.get('/:id', getApartmentOptions, getApartmentHandler);
    done();
}
export default registerApartmentRoutes;
