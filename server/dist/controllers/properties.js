"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restore = exports.softDelete = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAll = async (req, res) => {
    try {
        const includeRemoved = req.query.includeRemoved === 'true';
        let query = 'SELECT * FROM properties';
        if (!includeRemoved) {
            query += ' WHERE is_remove = FALSE';
        }
        query += ' ORDER BY created_at DESC';
        const [rows] = await db_1.default.query(query);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAll = getAll;
const getById = async (req, res) => {
    try {
        const [rows] = await db_1.default.query('SELECT * FROM properties WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getById = getById;
const create = async (req, res) => {
    try {
        const data = req.body;
        // Convert arrays/objects to JSON strings for MySQL
        const dbData = { ...data };
        if (dbData.images)
            dbData.images = JSON.stringify(dbData.images);
        if (dbData.amenities)
            dbData.amenities = JSON.stringify(dbData.amenities);
        if (dbData.water)
            dbData.water = JSON.stringify(dbData.water);
        if (dbData.heating_sources)
            dbData.heating_sources = JSON.stringify(dbData.heating_sources);
        if (dbData.commercial_types)
            dbData.commercial_types = JSON.stringify(dbData.commercial_types);
        if (dbData.road_type)
            dbData.road_type = JSON.stringify(dbData.road_type);
        const [result] = await db_1.default.query('INSERT INTO properties SET ?', [dbData]);
        const [newProperty] = await db_1.default.query('SELECT * FROM properties WHERE id = ?', [result.insertId]);
        res.status(201).json(newProperty[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        // Convert arrays/objects to JSON strings
        const dbData = { ...data };
        if (dbData.images)
            dbData.images = JSON.stringify(dbData.images);
        if (dbData.amenities)
            dbData.amenities = JSON.stringify(dbData.amenities);
        if (dbData.water)
            dbData.water = JSON.stringify(dbData.water);
        if (dbData.heating_sources)
            dbData.heating_sources = JSON.stringify(dbData.heating_sources);
        if (dbData.commercial_types)
            dbData.commercial_types = JSON.stringify(dbData.commercial_types);
        if (dbData.road_type)
            dbData.road_type = JSON.stringify(dbData.road_type);
        await db_1.default.query('UPDATE properties SET ? WHERE id = ?', [dbData, id]);
        const [updated] = await db_1.default.query('SELECT * FROM properties WHERE id = ?', [id]);
        res.json(updated[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.update = update;
const softDelete = async (req, res) => {
    try {
        await db_1.default.query('UPDATE properties SET is_remove = TRUE WHERE id = ?', [req.params.id]);
        const [updated] = await db_1.default.query('SELECT * FROM properties WHERE id = ?', [req.params.id]);
        res.json(updated[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.softDelete = softDelete;
const restore = async (req, res) => {
    try {
        await db_1.default.query('UPDATE properties SET is_remove = FALSE WHERE id = ?', [req.params.id]);
        const [updated] = await db_1.default.query('SELECT * FROM properties WHERE id = ?', [req.params.id]);
        res.json(updated[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.restore = restore;
