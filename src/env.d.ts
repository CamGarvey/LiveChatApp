declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_AUTH0_DOMAIN: string;
    REACT_APP_AUTH0_CLIENT_ID: string;
    REACT_APP_AUTH0_AUDIENCE: string;
    REACT_APP_GRAPHQL_API_URL: string;
    REACT_APP_GRAPHQL_SUBSCRIPTION_URL: string;
    REACT_APP_AVATAR_BASE_URL: string;
  }
}
