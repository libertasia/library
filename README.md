# Fullstack-Typescript-Project "Library"

This project has been completed as part of Integrify FullStack program.

Latest version is deployed at https://incomparable-mermaid-5e7253.netlify.app/.

## Project description

Unregistered user can see the list of books on the Home page, move between pages and change the number of books per page. When the user changes the page, a request is sent to the backend with the page number and number of items per page and the backend returns data for this specific page only, which speeds things up a bit.
The unregistered user can also search and filter the list of books by a number of parameters, and this search and filtering is also done on the backend side.
There is a similar page with a list of authors. Where user can see all the books written by a given author and also their biography.
User can sign in and logout using their Google account. Login information is shared between frontend and backend using cookies.
After logging in user with admin privileges can do much more: borrow a book from the library, return the book, add a new author or a new book, delete and edit book or author.

## Prerequisites

1. Install mongodb or use MongoDB Atlas. 
2. Install nodejs v16.15.0 (if you don't have it already)

## Setting Up for `API folder`

1. Create a `.env` file in the root directory and copy the content from `.env.example`
2. Make sure mongodb is running (if you are using local MongoDB)
3. Install dependencies: `npm i`
4. Use this command for development mode: `npm run start:dev`
5. If you need to customize your env, take a look at `secrets.ts` file

## Setting Up for `Client folder`

1. Navigate to the client folder and install dependencies by running: `$ npm install`
2. Start the app by running: `$ npm start`

## Used technologies

### Frontend
* TypeScript
* Material UI
* Formik
* React.js, React.js hooks
* React-router
* Redux
* Redux-thunk
* Axios
* Prettier
* ESLint
* Husky & lint-staged

### Backend
* express.js
* MongoDB Atlas
* passport, google and jwt strategy
* Jest
* supertest
* Prettier
* ESLint
* Husky & lint-staged
