/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_GRAPHQL_API_URL: string;
  readonly VITE_GRAPHQL_SUBSCRIPTION_URL: string;
  readonly VITE_AVATAR_BASE_URL: string;
  readonly VITE_SECRET: string;
  readonly SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
