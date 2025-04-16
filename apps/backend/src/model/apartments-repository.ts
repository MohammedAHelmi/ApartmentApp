import Repository from './abstract-repository.js';
import { DALOptions } from '../types/dal-options.types.js';
import getApartmentsQueryBuilder from './helpers/get-apartments-query-builder.js';
import toApartment from './helpers/row-to-apartment.js';
import { Apartment } from '@apartmentapp/types';

class ApartmentsRepository extends Repository{
    /**
     * Fetches a list of apartments with the functionality to apply filters, order, limit, offset
     * @param options filters, order, limit, offset options
     * @returns 
     */
    static async getApartments(options: DALOptions): Promise<Apartment[]>{
        const [query, params] = getApartmentsQueryBuilder(options);
        const { rows } = await this.pool.query(query, params);
        return rows.map(row => toApartment(row))
    }

    /**
     * Gets apartment with photo urls and amenities
     * @param id - Apartment ID 
     * @returns Apartment object of the corresponding id
     */
    static async getApartment(id: number): Promise<Apartment|void>{
        const { rows } = await this.pool.query(`
            SELECT apartments.id, apartments.name, unit_number, size, beds, baths, price, finishing, delivery, about,
            projects.name AS project_name, projects.developer, block_num, lat, long, 
            cities.name AS city, provinces.name AS province
            FROM apartments
            JOIN addresses ON apartments.address_id = addresses.id
            JOIN projects ON addresses.project_id = projects.id
            JOIN cities ON projects.city_id = cities.id
            JOIN provinces ON cities.province_id = provinces.id
            WHERE apartments.id = $1
        `, [id]);

        return rows[0] && toApartment(rows[0]);
    }

    /**
     * 
     * @param apartment Apartment object
     * @returns Apartment ID
     */
    static async addApartment(apartment: Omit<Apartment, 'id' | 'address' | 'pictures' | 'amenities'>, addressId: number): Promise<number>{
        // remove if exists
        if(apartment.unitNumber)
            await this.removeApartment(apartment.unitNumber, addressId);
        const { rows } = await this.pool.query(`
            INSERT INTO apartments (name, unit_number, size, beds, baths, finishing, delivery, price, about, address_id)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id
        `, [
            apartment.name, 
            apartment.unitNumber, 
            apartment.size,
            apartment.beds,
            apartment.baths,
            apartment.finishing,
            apartment.delivery,
            apartment.price,
            apartment.about,
            addressId
        ]);

        return rows[0].id;
    }

    static async removeApartment(unitNumber: number, addressId: number){
        return await this.pool.query(`
            DELETE FROM apartments
            WHERE unit_number = $1 AND address_id = $2;
        `, [unitNumber, addressId])
    }
}

export default ApartmentsRepository;