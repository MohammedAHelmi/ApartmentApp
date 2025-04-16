import whereBuilder from './where-statement-builder.js';
import orderByBuilder from './order-by-statement-builder.js';
import limitOffsetBuilder from './limit-offset-statment-build.js';
function getApartmentsQueryBuilder(options) {
    // base query
    let query = `
        SELECT apartments.id, apartments.name, unit_number, size, beds, baths, price,
        projects.name AS project_name, lat, long, 
        cities.name AS city, provinces.name AS province
        FROM apartments
        JOIN addresses ON apartments.address_id = addresses.id
        JOIN projects ON addresses.project_id = projects.id
        JOIN cities ON projects.city_id = cities.id
        JOIN provinces ON cities.province_id = provinces.id
        `;
    const params = [];
    // add where
    if (options.filters != null) {
        const [whereStatement, values] = whereBuilder(options.filters);
        query = `${query} ${whereStatement}`;
        params.push(...values);
    }
    // add order by
    if (options.sort != null) {
        const orderStatement = orderByBuilder(options.sort);
        query = `${query} ${orderStatement}`;
    }
    // add limit & offset
    const paramsOffset = params.length + 1;
    const [limitOffsetStatement, values] = limitOffsetBuilder(paramsOffset, options.limit, options.offset);
    query = `${query} ${limitOffsetStatement}`;
    params.push(...values);
    return [query, params];
}
export default getApartmentsQueryBuilder;
