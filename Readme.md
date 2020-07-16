
# Node Server boilerplate using Typescript and OpenApi v3

![alt text](https://www.startus.cc/sites/default/files/styles/company_profile_cover/public/logo_1_rand2000x.png?itok=QKPdHi01 "Jiratech Logo")



## Description

- The project at its core uses **Typescript** together with **Node-express**.
- The **database** configured is **PostgreSQL**.
- The server uses a **3 layer structure** which better defines business logic to can easily scale up for any requirement.
- **API's** are defined by the use of a **json** file describing the structure to use and an **OpenAPI** tool to generate described files.

## TL;DR

1. Install docker and docker-compose 
~~~~
cd fast-start
chmod u+x docker-compose-ubuntu.sh
./docker-compose-ubuntu.sh
~~~~
2. Build server image in root
~~~~
docker build -t node-boilerplate:latest .
~~~~
3. Run docker compose (this will start the server with a postgres database)
~~~~
cd fast-start
docker-compose up -d
~~~~

## How to configure

1. `yarn` on main directory to install dependencies.
2. `yarn start` on main directory to start, generate files and run server(in this step openapi automatically generates required files).

## Stack we used

1. Node-express
2. Typescript
3. PostgreSQL
4. Sequelize Typescript
5. Jsonwebtoken
6. Openapi-generator-cli (this one requires java to be installed)
7. bcryptjs

## Important file locations

1. server.ts is the initialization point for all components in the application and where the server actually runs through its endpoints.
2. database.ts is the configuration file for the sequelize database.
3. dal/dao represents the folder containing all Models used in the application.
4. The Controllers folder represent the endpoints for the application.
5. The Repository folder represents the location where CRUD operations take place.
6. The Services folder is the gateway between all application data communication such as repository <-> controller.
7. in config folder we can find the configuration files for various services.
8. In utils we find various functions or objects to help bigger components.
9. Middlewares folder helps the application by filtering or modifying information before any other component.

## Business logic

### As we use openapi to generate interfaces, use middleware and make endpoints URLs usable it is mandatory to know the server flow

1. By generating openapi files, we also allow the app to use the interfaces for the objects defined in the openapi schema. This way both the client and the server know what kind of objects they are dealing with.
2. The endpoints paths that are defined in the schema can be accessed only by having a reference to the functions in the controllers. This reference is made by having "x-eov-operation-handler" field with the path of the file in the project, and an "operationId" which specifies which function to call.
3. The app has two different flows for the use of middlewares:

- By specifying a security scheme in the openapi one can apply different functions that act as a middlewares. These functions are specified in server.ts when defining an "OpenApiValidator" at "validateSecurity".
- By applying various functions in the flow of the controllers, they can act as middlewares and will halt the application if imposed rules are broken.

## Docker setup

1. Have a container up and running.
2. From your project root folder, run: `docker build -t <image name> .`
3. To run the created image, run:

mandatory parameters

```docker
docker run -p 3000:3000 \
-e DB_HOST=<db host address> \
-e DB_PORT=<db host port> \
-e DB_NAME=<db name> \
-e DB_USER=<db name> \
-e DB_PASS=<db password> \
-d <docker image name>
```

3.1. optional parameters

```docker
-e ACCESS_KEY=<any string> \
-e REFRESH_KEY=<any string> \
-e ADMIN_EMAIL=<admin default email> \
-e ADMIN_USER=<admin default name> \
-e ADMIN_PASS=<admin default password> \
-e SENTRY_DSN=<sentry dsn> \
```

4. (Optional if running docker with virtualbox)Find the docker container ip address by running: `docker-machine ip default`
5. Connect to the server on the mentioned port.

## Other setup

1. in server.ts use "force: true" (`await sequelize.sync({force: true});`) if you want to delete db after each use.

## Other info

1. The application generates 2 default roles at every runtime if the roles were not previously created.
2. If you want to change any default role go to UserService and at createUser function change what role name to look for in RoleService.
3. When an user is created admin/user, email field must respect required shape eg: 'email@email.email' and the password must have 1 big letter, 1 number and 8 characters in total.

## IMPORTANT

1. Do not change the version of openapi unless you know what you are doing.
2. Make sure you connect to the right database.
