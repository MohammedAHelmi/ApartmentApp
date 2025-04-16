import { FastifyReply, FastifyRequest } from "fastify";
import ApartmentsRepository from "../model/apartments-repository.js";
import ProvincesRepository from "../model/provinces-repository.js";
import CitiesRepository from "../model/cities-repository.js";
import ProjectsRepository from "../model/projects.repository.js";
import AddressesRepository from "../model/addresses-repository.js";
import { Apartment } from "@apartmentapp/types";
import AmenitiesRepository from "../model/amenities-repository.js";
import PicturesRepository from "../model/pictures-repository.js";

export async function addApartmentHandler(
    request: FastifyRequest< { Body: Omit<Apartment, 'id'> }> ,
    reply: FastifyReply
  ){
    const apartment = request.body;

    // insert province
    const provId = await ProvincesRepository.addProvinceIfAbsent(apartment.address.province);

    // insert city
    const cityId = await CitiesRepository.addCityIfAbsent(provId, apartment.address.city);
    
    // insert project
    const projectName = apartment.address.project.name;
    const developerName = apartment.address.project.developer;
    const projectId = await ProjectsRepository.addProjectIfAbsent(cityId, projectName, developerName);

    // insert address
    const addressId = await AddressesRepository.addAddressIfAbsent(projectId, apartment.address.blockNumber, apartment.address.location);

    // insert apartment
    const apartmentId = await ApartmentsRepository.addApartment(apartment, addressId);

    // insert amenities 
    const amenitiesPromise = Promise.allSettled(
        apartment.amenities.map(async (amenity: string) => await AmenitiesRepository.addApartmentAmenity(apartmentId, amenity))
    );

    // insert pictures
    const picturesPromise = Promise.allSettled(
        apartment.pictures.map(async (picUrl: string) => await PicturesRepository.addPicture(apartmentId, picUrl))
    );

    await Promise.allSettled([amenitiesPromise, picturesPromise]);

    reply.code(201).send(apartmentId);
}

const bodySchema = {
    type: 'object',
    required: [
        'name',
        'unitNumber',
        'size', 
        'beds', 
        'baths', 
        'price', 
        'address', 
        'delivery',
        'pictures',
        'finishing',
        'amenities',
        'about'
    ],
    properties: {
        'name': { type: 'string' },
        'unitNumber': { type: 'integer'},
        'size': { type: 'integer', exclusiveMinimum: 0 },
        'beds': { type: 'integer', minimum: 0 },
        'baths': { type: 'integer', minimum: 0 },
        'price': { type: 'integer' },
        'finishing': { type: 'string' },
        'address': {
            type: 'object',
            required: ['blockNumber', 'project', 'city', 'province'],
            properties: {
                'blockNumber': { type: 'integer' },
                'project': {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        'name': { type: 'string' },
                        'developer': { type: 'string' }
                    }
                },
                'city': { type: 'string' },
                'province': { type: 'string' },
                'location': {
                    'type': 'object',
                    'required': ['lat', 'long'],
                    'properties': {
                        'lat': { type: 'number', minimum: -90, maximum: 90 },
                        'long': { type: 'number', minimum: -180, maximum: 180  }
                    }
                }
            }
        },
        'pictures': {
            type: 'array',
            items: { type: 'string' }
        },
        'amenities': {
            type: 'array',
            items: { type: 'string' }
        },
        'about': { type: 'string' },
        'delivery': { type: 'string', format: 'date' },
    }
};

export const addApartmentOptions = {
    schema: {
        body: bodySchema
    }
};