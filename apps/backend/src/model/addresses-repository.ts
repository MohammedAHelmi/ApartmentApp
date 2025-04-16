import Repository from './abstract-repository.js';

class AddressesRepository extends Repository{
    static async addAddressIfAbsent(projectId: number, blockNum: number, location?: { lat: number, long: number }): Promise<number>{
        const { rows: idRows } = await this.pool.query(`
            SELECT id FROM addresses WHERE project_id = $1 AND block_num = $2;
        `, [projectId, blockNum]);

        if(idRows[0]?.id != null)
            return idRows[0].id;

        const { rows } = await this.pool.query(`
            INSERT INTO addresses (project_id, block_num, lat, long)
            VALUES
                ($1, $2, $3, $4)
            RETURNING id;
        `, [projectId, blockNum, location?.lat, location?.long]);

        return rows[0].id;
    }
}

export default AddressesRepository;