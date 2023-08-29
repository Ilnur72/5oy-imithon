export interface IConfig {
  port: number;
  db: IDatabaseConfig;
  jwt: IJwtConfig;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  name: string;
}

export interface IJwtConfig {
  secret: string;
}

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10),
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
