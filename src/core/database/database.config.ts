interface DatabaseConfig {
  dialect: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export default (): DatabaseConfig => ({
  dialect:
    process.env.DB_DIALECT === 'mysql' ? process.env.DB_DIALECT : 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
