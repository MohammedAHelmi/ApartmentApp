import Repository from './abstract-repository.js';
class AmenitiesRepository extends Repository {
    static async getApartmentAmenities(id) {
        const { rows } = await this.pool.query(`
            SELECT amenities.name
            FROM amenities
            JOIN apartment_amenities ON amenities.id = apartment_amenities.amenity_id
            WHERE apartment_amenities.apartment_id = $1;
        `, [id]);
        return rows.map(row => row.name);
    }
    static async addApartmentAmenity(apartmentId, amenity) {
        const amenityId = await this.addAmenityIfAbsent(amenity);
        await this.pool.query(`
            INSERT INTO apartment_amenities (apartment_id, amenity_id)
            VALUES
                ($1, $2);
        `, [apartmentId, amenityId]);
    }
    static async addAmenityIfAbsent(name) {
        const { rows: idRows } = await this.pool.query(`
            SELECT id FROM amenities WHERE name = $1;
        `, [name]);
        if (idRows[0]?.id != null)
            return idRows[0].id;
        const { rows } = await this.pool.query(`
            INSERT INTO amenities (name)
            VALUES
                ($1)
            RETURNING id;
        `, [name]);
        return rows[0].id;
    }
}
export default AmenitiesRepository;
