export interface DatabaseConfigAttributes {
  Dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface DatabaseConfig {
  development: DatabaseConfigAttributes;
  production: DatabaseConfigAttributes;
}
