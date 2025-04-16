"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shorthands = void 0;
exports.up = up;
exports.down = down;
exports.shorthands = undefined;
async function up(pgm) {
    pgm.sql(`
        CREATE TABLE provinces (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE cities (
            id SERIAL PRIMARY KEY,
            province_id INTEGER NOT NULL REFERENCES provinces (id),
            name TEXT NOT NULL,
            UNIQUE(province_id, name)
        );
        
        CREATE TABLE projects (
            id SERIAL PRIMARY KEY,
            city_id INTEGER NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
            name TEXT NOT NULL,
            developer TEXT,
            UNIQUE (city_id, name, developer)
        );

        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            block_num SMALLINT NOT NULL,
            project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
            lat NUMERIC(9, 7) CHECK(lat BETWEEN -90 AND 90),
            long NUMERIC(10, 7) CHECK(long BETWEEN -180 AND 180),
            UNIQUE(block_num, project_id)
        );

        CREATE TABLE apartments (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL DEFAULT 'Apartment',
            unit_number SMALLINT NOT NULL,
            size SMALLINT NOT NULL CHECK(size > 0),
            beds SMALLINT NOT NULL CHECK(beds >= 0),
            baths SMALLINT NOT NULL CHECK(baths >= 0),
            finishing TEXT NOT NULL DEFAULT '',
            delivery DATE NOT NULL,
            address_id INTEGER NOT NULL REFERENCES addresses(id) ON DELETE CASCADE,
            price INTEGER NOT NULL,
            about TEXT NOT NULL DEFAULT '',
            UNIQUE(unit_number, address_id)
        );

        CREATE TABLE amenities (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE apartment_amenities (
            apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
            amenity_id INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
            PRIMARY KEY(apartment_id, amenity_id)
        );

        CREATE TABLE pictures (
            id SERIAL PRIMARY KEY,
            apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
            url TEXT NOT NULL,
            UNIQUE(apartment_id, url)
        );

        CREATE EXTENSION IF NOT EXISTS pg_trgm;
        
        CREATE INDEX ON projects USING gin (name gin_trgm_ops);
        CREATE INDEX ON apartments USING gin (name gin_trgm_ops);
        CREATE INDEX ON apartments (unit_number);
    `);
}
async function down(pgm) {
    pgm.sql(`
        DROP TABLE apartment_amenities;
        DROP TABLE amenities;
        DROP TABLE pictures;
        DROP TABLE apartments;
        DROP TABLE addresses;
        DROP TABLE projects;
        DROP TABLE cities;
        DROP TABLE provinces;
    `);
}
