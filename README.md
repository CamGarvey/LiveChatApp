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
VITE_ AUTH0_CLIENT_ID=
VITE_ AUTH0_DOMAIN=
VITE_ AUTH0_AUDIENCE=
VITE_ GRAPHQL_API_URL=http://localhost:4000
VITE_ GRAPHQL_SUBSCRIPTION_URL=ws://localhost:4000
VITE_ AVATAR_BASE_URL=https://avatars.dicebear.com
TOKEN=
APOLLO_KEY=
```
