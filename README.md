# EngageSphere

[![CI](https://github.com/wlsf82/EngageSphere/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/wlsf82/EngageSphere/actions/workflows/ci-cd.yml)
[![EngageSphere](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/yebzus/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/yebzus/runs)

Sample project with an [Express.js](https://expressjs.com/) backend and a [React](https://react.dev/) frontend, running [Cypress](https://www.cypress.io/) tests on [GitHub Actions](https://github.com/features/actions).

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngageSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v22.13.1` while writing this doc)
- npm (I've used version `10.9.2` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Installation of `devDependencies`

After cloning this project, to install the dev dependencies, open a terminal, go to the root of this repo, and run `npm install` (or `npm i`, for short.)

## Tests

This project has frontend component tests, GUI tests, and backend API tests.

To run them all, simply run `npm test` (or `npm t`, for short.)

### Frontend component tests

Run `npm run test:frontend:component` to run the frontend component tests.

### GUI tests

Run `npm run test:frontend:gui` to run the GUI tests.

> To use the above script, both the backend and frontend servers should be up and running.

Or, run `npm run test:frontend:gui:with:servers` to automatically start the servers, run the tests, and shut them down.

> The GUI tests include a small suite of accessibility (a11y) tests.

### API tests

Run `npm run test:api` to run the backend tests.

> To use the above script, the backend server should be up and running.

Or, run `npm run test:api:with:server` to automatically start the backend server, run the tests, and shut it down.

### Test cases

Read the following [doc](./docs/TestCases.md) to get a list of test cases.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
