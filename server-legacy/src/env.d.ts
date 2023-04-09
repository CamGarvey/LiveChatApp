declare namespace NodeJS {
  export interface ProcessEnv {
    DOMAIN: string;
    DATABASE_URL: string;
    PORT: string;
    REDIS_URL: string;
    REDIS_PORT: string;
    CORS_ORIGIN: string;
    AUTH0_HOOK_SECRET: string;
    AUTH0_AUDIENCE: string;
    AUTH0_JWKS_URI: string;
    AUTH0_SIGNING_ALG: string;
    AUTH0_ISSUER_BASE_URL: string;
    HASH_SALT: string;
    HASH_MIN_LENGTH: string;
  }
}
