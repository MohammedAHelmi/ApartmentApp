import ApartmentsRepository from "../model/apartments-repository.js";
import AmenitiesRepository from "../model/amenities-repository.js";
import PicturesRepository from "../model/pictures-repository.js";
export async function getApartmentHandler(request, reply) {
    const { id } = request.params;
    const [apartmentPromise, amenitiesPromise, picturesPromise] = await Promise.allSettled([
        ApartmentsRepository.getApartment(id),
        AmenitiesRepository.getApartmentAmenities(id),
        PicturesRepository.getPictures(id)
    ]);
    // Apartments database error
    if (apartmentPromise.status === 'rejected')
        throw new Error(apartmentPromise.reason);
    if (apartmentPromise.value == null) {
        return reply.code(404).send('Apartment not found');
    }
    const apartment = apartmentPromise.value;
    if (amenitiesPromise.status === 'fulfilled')
        apartment.amenities = amenitiesPromise.value;
    if (picturesPromise.status === 'fulfilled')
        apartment.pictures = picturesPromise.value;
    return reply.code(200).send(apartment);
}
const paramsJsonSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
    }
};
export const getApartmentOptions = {
    schema: {
        params: paramsJsonSchema
    }
};
