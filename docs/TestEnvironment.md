# Test Environment - EngageSphere

The **EngageSphere** application is a web application written using ReactJS on the frontend and Node.js in the backend.

## PRE-REQUISITES

The only pre-requisite to run this app is to have npm and Node.js installed in your machine. For instructions on how to install, go to https://nodejs.org/en/

## How to run it

After cloning the repo ...

### 1 Starting the backend

You can run the backend locally or using Docker.

#### Running locally

Open a terminal, go to the root of this repo and:

```sh
cd backend
npm install
npm start
```

The server will be listening on port 3001. If you need to change this, go to `/backend/server.js` and change the port variable value on line 6.

```js
const port = 3001;
```

#### Using Docker

There are two different images for different platforms: **amd64** and **arm64**.

##### AMD64 (aka x86_64)

To run it using the AMD64 architecture (typical for most desktops and servers), execute the following command: `docker run --publish 3001:3001 wlsf82/engagesphereserver:amd64`.

##### ARM64

To run it using the ARM64 platform (often used in newer Macs with Apple Silicon, Raspberry Pis, and other ARM-based systems), execute the following command: `docker run --publish 3001:3001 wlsf82/engagesphereserver:arm64`.

### 2 Starting the frontend

Open a new terminal, go to the root of this repo and:

**Important:** if you changed the backend port number, you will have to change it also on `/frontend/src/App.js` on line 13, before starting the frontend.

```sh
cd frontend
npm install
npm start
```

Go to a web browser and open `http://localhost:3000/`.
