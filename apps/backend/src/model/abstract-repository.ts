import pg from 'pg';

abstract class Repository{
    static pool: pg.Pool;
}

export default Repository;