// config/config.js
require('dotenv').config();

const { DATABASE_URL } = process.env;

// Function to parse the DATABASE_URL
const parseDatabaseUrl = (url) => {
  const regex = /^postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)\?sslmode=(\w+)$/;
  const matches = url.match(regex);
  
  if (!matches) {
    throw new Error('Invalid DATABASE_URL format');
  }

  return {
    username: matches[1],
    password: matches[2],
    host: matches[3],
    port: matches[4],
    database: matches[5],
    ssl: matches[6] === 'require',
  };
};

const parsedDb = parseDatabaseUrl(DATABASE_URL);

module.exports = {
  development: {
    username: parsedDb.username,
    password: parsedDb.password,
    database: parsedDb.database,
    host: parsedDb.host,
    port: parsedDb.port,
    dialect: 'postgres',
    ssl: parsedDb.ssl,
  },
  test: {
    username: parsedDb.username,
    password: parsedDb.password,
    database: parsedDb.database,
    host: parsedDb.host,
    port: parsedDb.port,
    dialect: 'postgres',
    ssl: parsedDb.ssl,
  },
  production: {
    username: parsedDb.username,
    password: parsedDb.password,
    database: parsedDb.database,
    host: parsedDb.host,
    port: parsedDb.port,
    dialect: 'postgres',
    ssl: parsedDb.ssl,
  },
};
