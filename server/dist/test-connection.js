"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
async function testFullChain() {
    console.log('--- Начинаю проверку связи ---');
    try {
        console.log('1. Проверка подключения к MySQL...');
        const [rows] = await db_1.default.query('SELECT 1 + 1 AS result');
        console.log('✅ MySQL подключен успешно!');
        console.log('2. Проверка таблицы properties...');
        const [props] = await db_1.default.query('SELECT COUNT(*) as count FROM properties');
        console.log(`✅ Таблица properties найдена. Объектов в базе: ${props[0].count}`);
        console.log('3. Проверка таблицы users...');
        const [users] = await db_1.default.query('SELECT COUNT(*) as count FROM users');
        console.log(`✅ Таблица users найдена. Пользователей в базе: ${users[0].count}`);
        console.log('--- Все проверки пройдены! ---');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ ОШИБКА ПРИ ПРОВЕРКЕ:');
        console.error(error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Подсказка: Проверьте, что MySQL сервер запущен и доступы в .env верны.');
        }
        else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('Подсказка: База данных, указанная в .env, не существует.');
        }
        else if (error.code === 'ER_NO_SUCH_TABLE') {
            console.error('Подсказка: Вы забыли импортировать schema.sql в вашу базу.');
        }
        process.exit(1);
    }
}
testFullChain();
