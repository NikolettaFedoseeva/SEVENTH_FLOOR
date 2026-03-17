"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = void 0;
const db_1 = __importDefault(require("../config/db"));
const crypto_1 = __importDefault(require("crypto"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // ВНИМАНИЕ: В реальном проекте используйте bcrypt для хеширования паролей!
        const [rows] = await db_1.default.query('SELECT id, email, full_name FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }
        const user = rows[0];
        // Генерируем токен
        const token = crypto_1.default.randomBytes(48).toString('hex');
        // Срок жизни - 8 часов
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 8);
        // Сохраняем токен в БД
        await db_1.default.query('UPDATE users SET token = ?, token_expires_at = ? WHERE id = ?', [token, expiresAt, user.id]);
        res.json({
            user,
            session: { access_token: token }
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = authHeader.replace('Bearer ', '');
        const [rows] = await db_1.default.query('SELECT id, email, full_name FROM users WHERE token = ? AND token_expires_at > NOW()', [token]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Сессия истекла или неверный токен' });
        }
        res.json({ user: rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getMe = getMe;
