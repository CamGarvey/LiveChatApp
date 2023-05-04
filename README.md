# Live Chat App

(WORK IN PROGRESS)

React (Typescript) and Graphql Live Chat App.

## Dependencies

The following dependencies are required for the project:

- Node.js and npm
- Auth0 for authentication
- Chat API (https://github.com/CamGarvey/ChatAPI)

## Installation

To install and set up the project on your local machine, follow these steps:

- Run `yarn install` to install the required packages.
- Run `yarn start` to start up the development server.

## Usage

To interact with the Chat App, go to http://localhost:3000

## Environment Variables

Before running the project, make sure you have set the following environment variables:

```
VITE_APP_TITLE="Cam Chat"

VITE_AUTH0_CLIENT_ID=ykjYHTAgBdTmwJmSgOkL7UTOlQqKCJdR
VITE_AUTH0_DOMAIN=dev--2cpvhzk.us.auth0.com
VITE_AUTH0_AUDIENCE=https://dev--2cpvhzk.us.auth0.com/api/v2/

VITE_GRAPHQL_API_URL=http://localhost:4000
VITE_GRAPHQL_SUBSCRIPTION_URL=ws://localhost:4000

VITE_AVATAR_BASE_URL=https://avatars.dicebear.com

TOKEN=

APOLLO_KEY=
```
