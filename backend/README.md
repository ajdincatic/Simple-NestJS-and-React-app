# NestJS

## Table of Contents

1. [Introduction](#introduction)
2. [Setup Guide](#setup-guide)

- [Install Node and NPM](#install-node-and-npm)
- [Install Nest.js CLI](#install-nestjs-cli-globally)
- [Install PostgreSQL and pgAdmin4](#install-postgresql-version-160)
- [Setup .env File](#setup-env-file)
- [Install NPM Packages](#install-npm-packages-from-the-packagelockjson-file)
- [Start the App](#you-can-start-the-app-in-development-watch-mode-without-building-it)

3. [Project Structure](#project-structure)
4. [API Documentation](#api-docs)
5. [Security](#security)

- [Authentication](#authentication)

6. [Database](#database)

7. [Used libraries](#used-libraries)

## 1. Introduction

This repository contains code for the backend of the NestJS application.

The backend is created in the NestJS framework, version `10`.

A progressive Node.js framework for building efficient and scalable server-side applications.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 2. Setup guide

#### 2.1. Install Node and NPM:

Node: `v18.17.1`

NPM: `9.6.7`

_NOTE: A recommended way to install is using NVM._

Install using debian based linux OS:

`sudo apt update`

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh bash` - Should have curl installed

`nvm install v18.17.1`

`nvm use v18.17.1`

#### 2.2. Install Nest.js CLI globally using this command:

`npm i -g @nestjs/cli`

#### 2.3. Install PostgreSQL version 16.0 on your machine, and also pgAdmin4 to use the GUI version of the DBMS.

Connect to local database:

`psql -U postgres -h localhost`

You can list all databases using the command:

`\l`

You can list all users using the command:

`\du`

Create database and user for the database:

`CREATE DATABASE [database];`

`CREATE USER [username] WITH ENCRYPTED PASSWORD '[password]';`

`GRANT ALL PRIVILEGES ON DATABASE [database] TO [username];`

`ALTER DATABASE [database] OWNER TO [username];`

_NOTE: Tables will be created automatically when the app runs for the first time._

#### 2.4. Setup .env file

The recommended way to create this file is by copying the .env.example file using the command:

`cp .env.example .env`

Now set up the necessary env variables in the .env file, notes are in the .env.example file.

#### 2.6. Install NPM packages from the package.lock.json file using the command:

`npm run prepare:dependencies`

If you set up the app on the recommended versions of packages, this command should not fail.

_NOTE: Use npm install just for new packages._

#### 2.7. You can start the app in development watch mode without building it using the command:

`npm run start:dev`

#### 2.8. If you want to build an app use this command:

`npm run build`

Use same command for rebuild. In background it uses `nest build` command.

Then you can run it using production build:

`npm run start:prod`

_NOTE: You can also use the PM2 service to run the app in the background. This command is mainly used on the server._

#### 2.9. Now everything should be ready to start the app without problems.

## 3. Project structure

The project structure of this project follows the NestJS convention.

`dist` - Stores data after the app is built

`node_modules` - Stores data for installed NPM packages

`src` - This is where all code is stored

---

The `main.ts` is the startup file and `app.module.ts` is the main module where all others are initialized.

In this folder, as you can see every separate layer is stored in a different folder by the name.

`src/api` - Logical modules are separated into folders inside this folder.

Every module folder contains(for example `user` module):

- `user.module.ts` - This is where the module is initiated with all needed dependencies. Every module must be initiated in `app.module.ts` file.
- `user.contoller.ts` - This is where endpoints are stored, every method is one endpoint defined by URI.
- `user.service.ts` - In the service file, all application logic is handled.
- `user/dtos` - Store data-transform objects. Prefer to convert DB entities to DTO before returning it in response. In DTO we can transform and validate requests and responses.
- `user/entities` - One entity is mapped to one database table. Every file with .entity in the name will be processed as a DB table.

`src/decorators` - In this folder, we have custom decorators. For example, `GetAuthUser` is used to get the auth user from context and encapsulate it into the endpoint. A NestJS custom decorator is a TypeScript function that extends the framework's metadata system, allowing users to add custom metadata to classes, methods, or parameters, enabling powerful and expressive metadata-driven programming paradigms.

`src/shared` - Refers to a directory within the project's file structure where developers can store and organize files that are used by multiple parts of the application.

---

The `swagger.ts` file stores metadata for API documentation.

## 4. API Docs

We use Swagger for API documentation.

This documentation is stored on `/swagger` URI.

## 5. Security

#### 6.1. Authentication

We secure endpoints by the `JwtAndRolesGuard` guard which before the endpoint is executed first gets auth user from context and then checks if JWT is valid and if the user role matches roles that can execute this endpoint.

## 6. Database

As it was mentioned before we use Postgres DB version 16. Inside our app, we use `TypeORM` ORM to communicate with the database.

Connection with the database is initiated inside the app.module.ts file with the data from the `.env` file.

Every file in the app that has `.entity.ts` in its name will be processed as a database table. Entity is just one regular class with properties. The only thing that makes entity different from class is the decorators provided by ORM that we use. You can read more about this in TypeORM official documentation. Also, we use `AbstractEntity` class in order to store shared fields that every other entity will have, like id, date of creation, etc.

DB synchronization is turned ON. This means that every time the app runs it checks if there are differences in entity files and DB tables and if there are changes it synchronizes it. You can turn it off by setting synchronize to false but then you should create migration files.

## 7. Used libraries

aws-sdk - used for interacting with AWS S3 service. It provides a comprehensive set of tools for integrating your application with AWS infrastructure.

bcrypt - used for hashing passwords to enhance security. It is a popular library for hashing and comparing passwords to ensure that sensitive information is stored securely.

lodash - used for utility functions for common programming tasks such as manipulating arrays, objects, and strings. Used for converting objects to DTOs.

multer - used for handling file uploads in Node.js applications. It is a middleware for handling multipart/form-data, primarily used for uploading files. In combination with AWS S3 service.
