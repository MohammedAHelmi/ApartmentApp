import Repository from './abstract-repository.js';

class PicturesRepository extends Repository{
    static async getPictures(apartmentId: number): Promise<string[]>{
        const { rows } = await this.pool.query(`
            SELECT url
            FROM pictures
            JOIN apartments ON apartments.id = pictures.apartment_id
            WHERE apartments.id = $1;
        `, [apartmentId]);

        return rows.map(row => row.url);
    }

    static async addPicture(apartmentId: number, url: string){
        await this.pool.query(`
            INSERT INTO pictures (apartment_id, url)
            VALUES
                ($1, $2);    
        `, [apartmentId, url])
    }
}

export default PicturesRepository;