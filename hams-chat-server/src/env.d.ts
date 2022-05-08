declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    REDIS_URL: string;
    REDIS_PORT: string;
    CORS_ORIGIN: string;
  }
}
