import Repository from "./abstract-repository.js";


class ProvincesRepository extends Repository{
    static async addProvinceIfAbsent(name: string): Promise<number>{
        const { rows: idRows } = await this.pool.query(`
            SELECT id FROM provinces WHERE name = $1;
        `, [name]);

        if(idRows[0]?.id != null)
            return idRows[0].id;
        
        
        const { rows } = await this.pool.query(`
            INSERT INTO provinces (name)
            VALUES
                ($1)
            RETURNING id;
        `, [name]);

        return rows[0].id;
    }
}

export default ProvincesRepository;