export interface DatabaseConfigAttributes {
  dialect: string;
  host: string;
  port: number | string;
  username: string;
  password: string;
  database: string;
}

export interface DatabaseConfig {
  development: DatabaseConfigAttributes;
  production: DatabaseConfigAttributes;
}
