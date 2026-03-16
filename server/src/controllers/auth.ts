import { Request, Response } from 'express';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';

import crypto from 'crypto';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // ВНИМАНИЕ: В реальном проекте используйте bcrypt для хеширования паролей!
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, email, full_name FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const user = rows[0];
    
    // Генерируем токен
    const token = crypto.randomBytes(48).toString('hex');
    // Срок жизни - 8 часов
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 8);

    // Сохраняем токен в БД
    await pool.query(
      'UPDATE users SET token = ?, token_expires_at = ? WHERE id = ?',
      [token, expiresAt, user.id]
    );

    res.json({
      user,
      session: { access_token: token }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, email, full_name FROM users WHERE token = ? AND token_expires_at > NOW()',
      [token]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Сессия истекла или неверный токен' });
    }

    res.json({ user: rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
