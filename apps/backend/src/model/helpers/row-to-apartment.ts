import { Apartment } from "@apartmentapp/types";

function toApartment(row: any): Apartment {
    return  {
        id: row.id,
        name: row.name,
        unitNumber: row.unit_number,
        size: row.size,
        beds: row.beds,
        baths: row.baths,
        price: row.price,
        finishing: row.finishing,
        delivery: row.delivery,
        about: row.about,
        address: {
            blockNumber: row.block_num,
            project: {
                name: row.project_name,
                developer: row.developer
            },
            city: row.city,
            province: row.province,
            location: row.lat && row.long ? {
                lat: row.lat,
                long: row.long
            } : undefined
        },
        pictures: [],
        amenities: []
    };
}

export default toApartment;