# EngangeSphere

[![CI](https://github.com/wlsf82/EngageSphere/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/EngageSphere/actions/workflows/ci.yml)

Sample project with basic "backend" and frontend, running tests on GitHub Actions.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngangeSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.34.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v18.15.0` while writing this doc)
- npm (I've used version `9.5.0` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Installation of `devDependencies`

After cloning this project, to install the dev dependencies, open a terminal and run `npm install` (or `npm i`, for short.)

## Tests

This project has frontend unit and component tests, GUI tests, and backend API tests.

### Frontend unit tests

Run `npm run test:frontend:unit` to run the frontend unit tests.

### Frontend component tests

Run `npm run test:frontend:component` to run the frontend component tests.

### GUI tests

Run `npm run test:frontend:gui` to run the GUI tests.

> To use the above script, the frontend server should be up and running.

Or, run `npm run test:frontend:gui:with:server` to automatically start the server, run the tests, and shut it down.

### API tests

Run `npm run test:api` to run the backend tests.

> To use the above script, both the backend and frontend servers should be up and running.
>
> **Note:** Although these are backend tests, the frontend server needs to be running due to the `baseUrl` definition at the `cypress.config.js` file.

Or, run `npm run test:api:with:servers` to automatically start the servers, run the tests, and shut them down.

### Test cases

Read the following [doc](./docs/TestCases.md) to get a list of test cases.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
