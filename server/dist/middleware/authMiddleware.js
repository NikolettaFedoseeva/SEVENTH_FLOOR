"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const db_1 = __importDefault(require("../config/db"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(419).json({ error: 'Token missing' }); // 419 is often used for expired/missing session in some conventions, or just 401
        }
        const token = authHeader.replace('Bearer ', '');
        const [rows] = await db_1.default.query('SELECT id, email, full_name FROM users WHERE token = ? AND token_expires_at > NOW()', [token]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Unauthorized or token expired' });
        }
        req.user = rows[0];
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.authMiddleware = authMiddleware;
