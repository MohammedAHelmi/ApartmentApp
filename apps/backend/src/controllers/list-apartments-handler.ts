import { FastifyReply, FastifyRequest } from "fastify";
import { Comparator, DALOptions, Filter, Sort } from "../types/dal-options.types.js";
import ApartmentsRepository from "../model/apartments-repository.js";
import PicturesRepository from "../model/pictures-repository.js";
import { Apartment } from "@apartmentapp/types";

type ApartmentQuery = {
    term?: string;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };

/**
 * The function uses the query string to build condition to send to database on the rows returned
 * The condition are of DALOptions type which specifies filter, limit and of results, order column of results, order direction
 * A search filter is simply the column to search in, database comparator (<=, >=, ILIKE) and the term to search for
 * This logic is particularly useful because we can create multiple DALOptions object each has its own search filter which allows us to search in more than one column and then combine the results
 * Sort is also done in very similar way to search filter
 * @param request
 * @param reply 
 */
export async function listApartmentsHandler(
  request: FastifyRequest<{ Querystring: ApartmentQuery }>,
  reply: FastifyReply
) {
    const options = constructOptions(request.query);

    const matchingApartments = await Promise.allSettled(
        options.map(async optionsObj => await getApartments(optionsObj))
    );

    const apartments = matchingApartments
    .filter(apartmentPromise => apartmentPromise.status === 'fulfilled')
    .flatMap(apartmentPromise => apartmentPromise.value);
    
    reply.status(200).send(apartments);
}

function constructOptions({ term, limit, offset, sortBy, sortOrder }: ApartmentQuery): DALOptions[]{
    const searchFilters = constructSearchFilters(term);
    const options = {
        limit,
        offset,
        sort: constructSort(sortBy, sortOrder)
    };
    
    if(searchFilters.length === 0)
        return [options];
    
    return searchFilters.map(searchFilter => {
        return { filters: [searchFilter], ...options };
    });
}


const searchableColumns: {
    type: string
    column: string;
    comparator: Comparator;
}[] = [
    {
        type: 'string',
        column: "projects.name",
        comparator: Comparator.lk,
    },
    {
        type: 'string',
        column: "apartments.name",
        comparator: Comparator.lk,
    },
    {
        type: 'number',
        column: "unit_number",
        comparator: Comparator.eq,
    },
];

function constructSearchFilters(term: string | undefined): Filter[] {
    if(typeof term === 'undefined')
        return [];
    return searchableColumns
    .filter(col => typeof term === col.type)
    .map((col) => ({
        column: col.column,
        comparator: col.comparator,
        value: col.comparator === Comparator.lk? `%${term}%`: term
    }));
}

function constructSort(
    sortBy?: string,
    sortOrder: "asc" | "desc" = "asc"
    ): Sort | undefined {
    const validColumns = new Set(["size", "price", "beds"]);
    if (sortBy && validColumns.has(sortBy)) {
        return {
            column: sortBy,
            direction: sortOrder.toLowerCase() === "desc" ? "desc" : "asc",
        };
    }
    return undefined;
}

async function getApartments(options: DALOptions): Promise<Apartment[]>{
    const apartments = await ApartmentsRepository.getApartments(options);
    await attachPictures(apartments);
    return apartments;
}

async function attachPictures(apartments: any[]) {
    const results = await Promise.allSettled(
        apartments.map((apt) => PicturesRepository.getPictures(apt.id))
    );

    results.forEach((result, i) => {
    apartments[i].pictures =
        result.status === "fulfilled" ? result.value : [];
    });
}

const queryStringJsonSchema = {
    type: 'object',
    properties: {
        'term': { type: 'string' },
        'limit': { type: 'integer', minimum: 0 },
        'offset': { type: 'integer', minimum: 0 },
        'sortBy': { type: 'string' },
        'sortOrder': { type: 'string', enum: ['asc', 'desc']}
    }
}

export const listApartmentsOptions = {
    schema: {
        querystring: queryStringJsonSchema
    }
};