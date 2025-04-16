import Repository from "./abstract-repository.js";
class CitiesRepository extends Repository {
    static async addCityIfAbsent(provinceId, name) {
        const { rows: idRows } = await this.pool.query(`
            SELECT id FROM cities WHERE province_id = $1 AND name = $2;
        `, [provinceId, name]);
        if (idRows[0]?.id != null)
            return idRows[0].id;
        const { rows } = await this.pool.query(`
            INSERT INTO cities (province_id, name)
            VALUES
                ($1, $2)
            RETURNING id;
        `, [provinceId, name]);
        return rows[0].id;
    }
}
export default CitiesRepository;
