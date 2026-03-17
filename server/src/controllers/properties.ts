import { Request, Response } from 'express';
import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getAll = async (req: Request, res: Response) => {
  try {
    const includeRemoved = req.query.includeRemoved === 'true';
    let query = 'SELECT * FROM properties';
    
    if (!includeRemoved) {
      query += ' WHERE is_remove = FALSE';
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await pool.query<RowDataPacket[]>(query);
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM properties WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const JSON_FIELDS = ['amenities', 'water', 'heating_sources', 'commercial_types', 'road_type', 'images'];
const NUMERIC_FIELDS = ['price', 'area', 'rooms', 'floor', 'total_floors', 'living_area', 'kitchen_area', 'ceiling_height', 'land_area'];
const BOOLEAN_FIELDS = ['verified', 'electricity', 'has_buildings', 'is_remove'];
const VALID_COLUMNS = [
  'title', 'address', 'district', 'price', 'image_url', 'area', 'rooms', 'type', 'description',
  'rent_period', 'floor', 'total_floors', 'heating', 'building_type', 'building_status',
  'parking', 'source', 'verified', 'currency', 'images', 'video_url', 'city', 'house_number',
  'living_area', 'kitchen_area', 'ceiling_height', 'layout', 'room_type', 'bathroom', 'balcony', 'condition',
  'amenities', 'is_remove', 'wall_material', 'position_in_building', 'apartment_series', 'construction_type',
  'land_area', 'sewerage', 'gas', 'water', 'electricity', 'heating_sources', 'has_buildings',
  'commercial_types', 'land_type', 'road_type'
];

const sanitizePropertyData = (rawData: any) => {
  const data: any = {};
  
  // Filter only valid columns and handle potential arrays from multiple FormData fields
  VALID_COLUMNS.forEach(col => {
    if (rawData[col] !== undefined) {
      let val = rawData[col];
      
      // If multiple fields with the same name were sent, take the last one
      if (Array.isArray(val) && !JSON_FIELDS.includes(col)) {
        val = val[val.length - 1];
      }
      
      // Normalize common values
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (val === 'null' || val === '') val = null;
      
      // Type conversion
      if (NUMERIC_FIELDS.includes(col) && val !== null) {
        const num = parseFloat(val);
        val = isNaN(num) ? null : num;
      } else if (BOOLEAN_FIELDS.includes(col) && val !== null) {
        val = val === true || val === '1' || val === 1;
      } else if (JSON_FIELDS.includes(col) && val !== null) {
        // Ensure it's stringified JSON for the DB
        if (typeof val === 'object') {
          val = JSON.stringify(val);
        } else if (typeof val === 'string') {
          try {
            JSON.parse(val); // Verify validity
          } catch (e) {
            console.warn(`Field ${col} is not valid JSON string, wrapping in array`);
            val = JSON.stringify([val]);
          }
        }
      }
      
      data[col] = val;
    }
  });

  return data;
};

export const create = async (req: Request, res: Response) => {
  try {
    const rawData = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Process images
    let finalImages: string[] = [];
    if (rawData.images) {
      try {
        const imgVal = typeof rawData.images === 'string' ? JSON.parse(rawData.images) : rawData.images;
        finalImages = Array.isArray(imgVal) ? imgVal : [];
      } catch (e) {
        finalImages = [];
      }
    }

    if (files && files['images']) {
      const newPaths = files['images'].map(file => `/uploads/${file.filename}`);
      finalImages = [...finalImages, ...newPaths];
    }
    rawData.images = finalImages;

    // 2. Process image_url (Main Image)
    if (rawData.main_image_index !== undefined) {
      const idx = parseInt(rawData.main_image_index);
      if (!isNaN(idx) && idx >= 0 && idx < finalImages.length) {
        rawData.image_url = finalImages[idx];
      }
    } else if (files && files['image_url'] && files['image_url'][0]) {
      rawData.image_url = `/uploads/${files['image_url'][0].filename}`;
    } else if (finalImages.length > 0 && !rawData.image_url) {
      rawData.image_url = finalImages[0];
    }

    // 3. Process video
    if (files && files['video']) {
      rawData.video_url = `/uploads/${files['video'][0].filename}`;
    }

    const data = sanitizePropertyData(rawData);

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO properties SET ?',
      [data]
    );
    
    const [newProperty] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM properties WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newProperty[0]);
  } catch (error: any) {
    console.error('Create Property Error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const rawData = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Process images
    let finalImages: string[] = [];
    let imagesInBody: any = null;
    if (rawData.images) {
      try {
        imagesInBody = typeof rawData.images === 'string' ? JSON.parse(rawData.images) : rawData.images;
        finalImages = Array.isArray(imagesInBody) ? imagesInBody : [];
      } catch (e) {
        finalImages = [];
      }
    }

    if (files && files['images']) {
      const newPaths = files['images'].map(file => `/uploads/${file.filename}`);
      finalImages = [...finalImages, ...newPaths];
    }
    
    if (rawData.images || (files && files['images'])) {
      rawData.images = finalImages;
    }

    // 2. Process image_url (Main Image)
    if (rawData.main_image_index !== undefined) {
      const idx = parseInt(rawData.main_image_index);
      if (!isNaN(idx) && idx >= 0 && idx < finalImages.length) {
        rawData.image_url = finalImages[idx];
      }
    } else if (files && files['image_url'] && files['image_url'][0]) {
      rawData.image_url = `/uploads/${files['image_url'][0].filename}`;
    }

    // 3. Process video
    if (files && files['video']) {
      rawData.video_url = `/uploads/${files['video'][0].filename}`;
    }

    const data = sanitizePropertyData(rawData);

    await pool.query(
      'UPDATE properties SET ? WHERE id = ?',
      [data, id]
    );
    
    const [updated] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM properties WHERE id = ?',
      [id]
    );
    
    res.json(updated[0]);
  } catch (error: any) {
    console.error('Update Property Error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const softDelete = async (req: Request, res: Response) => {
  try {
    await pool.query(
      'UPDATE properties SET is_remove = TRUE WHERE id = ?',
      [req.params.id]
    );
    
    const [updated] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM properties WHERE id = ?',
      [req.params.id]
    );
    
    res.json(updated[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const restore = async (req: Request, res: Response) => {
  try {
    await pool.query(
      'UPDATE properties SET is_remove = FALSE WHERE id = ?',
      [req.params.id]
    );
    
    const [updated] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM properties WHERE id = ?',
      [req.params.id]
    );
    
    res.json(updated[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
