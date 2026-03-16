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

export const create = async (req: Request, res: Response) => {
  try {
    console.log('Create Property Request:', req.body);
    const data = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Process images
    let finalImages: string[] = [];
    if (data.images) {
      try {
        finalImages = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
      } catch (e) {
        console.error('Error parsing images JSON:', e);
        finalImages = [];
      }
    }

    if (files && files['images']) {
      const newPaths = files['images'].map(file => `/uploads/${file.filename}`);
      finalImages = [...finalImages, ...newPaths];
    }
    
    // Only set data.images if we have images or it was explicitly provided
    if (finalImages.length > 0 || data.images) {
      data.images = JSON.stringify(finalImages);
    }

    // 2. Process image_url (Main Image)
    if (data.main_image_index !== undefined && finalImages.length > 0) {
      const idx = parseInt(data.main_image_index);
      if (!isNaN(idx) && idx >= 0 && idx < finalImages.length) {
        data.image_url = finalImages[idx];
      }
    } else if (files && files['image_url'] && files['image_url'][0]) {
      data.image_url = `/uploads/${files['image_url'][0].filename}`;
    } else if (finalImages.length > 0 && !data.image_url) {
      data.image_url = finalImages[0];
    }

    // 3. Process video
    if (files && files['video']) {
      data.video_url = `/uploads/${files['video'][0].filename}`;
    }

    // Cleanup
    delete data.main_image_index;
    delete data.id;

    // Convert types from FormData
    Object.keys(data).forEach(key => {
      if (data[key] === 'true') data[key] = true;
      else if (data[key] === 'false') data[key] = false;
      else if (data[key] === 'null') data[key] = null;
      else if (data[key] === '') data[key] = null;
    });

    const jsonFields = ['amenities', 'water', 'heating_sources', 'commercial_types', 'road_type'];
    jsonFields.forEach(field => {
      if (data[field] && typeof data[field] === 'string') {
        try {
          // Verify it's valid JSON if it's already a string
          JSON.parse(data[field]);
        } catch (e) {
          // If not valid JSON, it might be a plain string we should skip or wrap
          console.warn(`Field ${field} is not valid JSON, skipping stringification`);
        }
      } else if (data[field] && typeof data[field] === 'object') {
        data[field] = JSON.stringify(data[field]);
      }
    });

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
    console.log('Update Property Request ID:', req.params.id);
    console.log('Request Body:', req.body);
    
    const data = { ...req.body };
    const id = req.params.id;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Process images
    let finalImages: string[] = [];
    let imagesProvided = false;

    if (data.images) {
      imagesProvided = true;
      try {
        finalImages = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
      } catch (e) {
        console.error('Error parsing images JSON during update:', e);
        finalImages = [];
      }
    }

    if (files && files['images']) {
      imagesProvided = true;
      const newPaths = files['images'].map(file => `/uploads/${file.filename}`);
      finalImages = [...finalImages, ...newPaths];
    }
    
    if (imagesProvided) {
      data.images = JSON.stringify(finalImages);
    }

    // 2. Process image_url (Main Image)
    if (data.main_image_index !== undefined && finalImages.length > 0) {
      const idx = parseInt(data.main_image_index);
      if (!isNaN(idx) && idx >= 0 && idx < finalImages.length) {
        data.image_url = finalImages[idx];
      }
    } else if (files && files['image_url'] && files['image_url'][0]) {
      data.image_url = `/uploads/${files['image_url'][0].filename}`;
    }

    // 3. Process video
    if (files && files['video']) {
      data.video_url = `/uploads/${files['video'][0].filename}`;
    }

    // Cleanup
    delete data.main_image_index;
    delete data.id; // CRITICAL: remove id before SET ?

    // Normalize types from FormData
    Object.keys(data).forEach(key => {
      if (data[key] === 'true') data[key] = true;
      else if (data[key] === 'false') data[key] = false;
      else if (data[key] === 'null') data[key] = null;
      else if (data[key] === '') data[key] = null;
    });

    const jsonFields = ['amenities', 'water', 'heating_sources', 'commercial_types', 'road_type'];
    jsonFields.forEach(field => {
       if (data[field] && typeof data[field] === 'string') {
        try {
          JSON.parse(data[field]);
        } catch (e) {
          // ...
          console.warn(`Field ${field} is not valid JSON string`);
        }
      } else if (data[field] && typeof data[field] === 'object') {
        data[field] = JSON.stringify(data[field]);
      }
    });

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
