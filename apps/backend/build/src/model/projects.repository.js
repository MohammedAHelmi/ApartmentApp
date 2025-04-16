import Repository from './abstract-repository.js';
class ProjectsRepository extends Repository {
    static async addProjectIfAbsent(cityId, name, developer) {
        const { rows: idRows } = await this.pool.query(`
            SELECT id FROM projects WHERE city_id = $1 AND name = $2 AND developer = $3;
        `, [cityId, name, developer]);
        if (idRows[0]?.id != null)
            return idRows[0].id;
        const { rows } = await this.pool.query(`
            INSERT INTO projects (city_id, name, developer)
            VALUES
                ($1, $2, $3)
            RETURNING id;
        `, [cityId, name, developer]);
        return rows[0].id;
    }
}
export default ProjectsRepository;
