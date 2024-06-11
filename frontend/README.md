# React

## Table of Contents

1. [Introduction](#introduction)
2. [Setup Guide](#setup-guide)

- [Install Node and NPM](#install-node-and-npm)
- [Setup .env File](#setup-env-file)
- [Install NPM Packages](#install-npm-packages)
- [Build the App](#build-the-app)
- [Start the App](#start-the-app)

3. [Project Structure](#project-structure)
4. [Used libraries](#used-libraries)

## 1. Introduction

This repository contains code for the frontend of the React application.

This app is created in the React JavaScript library, version `18.3.1`.

**React** is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

_NOTE: This project uses TypeScript._

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

#### 2.2. Setup .env file

The recommended way to create this file is by copying the .env.example file using the command:

`cp .env.example .env`

Now set up the necessary env variables in the .env file, notes are in the .env.example file.

#### 2.3. Install NPM packages from the package.lock.json file using the command:

`npm run clean-install`

If you set up the app on the recommended versions of packages, this command should not fail.

_NOTE: Use npm install just for new packages._

#### 2.4. Build an app use this command:

`npm run build`

Rebuild the app using the command: `npm run rebuild`. This command is mainly used on the server.

#### 2.5. Start the app using the command:

`npm run start`

#### 2.6. Now everything should be ready to start the app without problems.

## 3. Project structure

`webapp` - Stores data after the app is built.
There is also `build` folder which is temporarily created in the build process and then renamed to `webapp`. This is because we don't want the to app be down in the build process.

`node_modules` - Stores data for installed NPM packages

`src` - This is where all code is stored

---

The main startup file is the `index.tsx` file which initializes the main app module called `App.tsx`.

`src/components` - This is where we store all page components including styles, subcomponents and shared components.

For example, we have created custom components for:

- Loading spinner
- Custom input
- etc.

_NOTE: Every component is created as a functional component._

`src/redux` - For state management inside the app, we use the redux library. We used more advanced implementation with Redux Toolkit.
Find out more at: [https://redux-toolkit.js.org/](#https://redux-toolkit.js.org/)

`src/shared` - This is the folder where we store all files that are shared across the app multiple times. Here we have enums, interfaces, constants, and custom TS types. Also, we set Token to the request using Axios middleware that is created inside this folder.

---

## 4. Used libraries

axios - used for making HTTP requests from the browser or Node.js. It is a promise-based HTTP client that allows for easy interaction with APIs, handling requests and responses efficiently.

bootstrap - used for designing responsive and mobile-first web pages. It is a popular front-end framework that provides a collection of CSS and JavaScript components for layout, forms, buttons, navigation, and other interface elements.

env-cmd - used for loading environment variables from an .env file into process.env in a Node.js application. This is particularly useful for managing configuration settings such as API keys, database connections, and other sensitive information.
