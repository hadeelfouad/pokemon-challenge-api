import 'dotenv/config';

const jwtSecret = process.env['JWT_SECRET'];

export const authConstants = { jwtSecret };
