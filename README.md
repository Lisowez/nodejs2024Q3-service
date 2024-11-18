# Home Library Service

## I didn't do the following:
 - +10 Implemented npm script for vulnerabilities scanning (free solution)

## Prerequisites

Ensure you have the following installed before proceeding:

- [Git](https://git-scm.com/downloads): Version control system
- [Node.js](https://nodejs.org/): Includes npm (Node.js Package Manager)
- [Docker](https://www.docker.com/products/docker-desktop): Containerization platform
  
## Downloading

```
git clone https://github.com/Lisowez/nodejs2024Q3-service.git
```
Switch to the dev-1 branch

```
git checkout dev-1
```

## Installing NPM modules

```
npm install
```

## Running application

Development mode:

Start:
```
npm run docker:up
```
Stop and remove docker containers:
```
npm run docker:down
```

Before switching between Develoopment and Hub modes, don't forget to stop and remove containers from the current mode.
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests 

```
npm run test
```
