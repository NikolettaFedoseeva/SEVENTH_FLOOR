import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    full_name: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(419).json({ error: 'Token missing' }); // 419 is often used for expired/missing session in some conventions, or just 401
    }

    const token = authHeader.replace('Bearer ', '');

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, email, full_name FROM users WHERE token = ? AND token_expires_at > NOW()',
      [token]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized or token expired' });
    }

    req.user = rows[0] as any;
    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
