# TODO CRUD API

A simple Express-based CRUD API for managing TODO items.

## Features

-User Authenticaton and Authorization
- Create, Read, Update, and Delete TODO items
- RESTful API endpoints
- JSON data format

## Installation

Clone the repository:

```bash
git clone https://github.com/Prakriti03/todo-API.git
```
Install dependencies :

```bash
npm install
```
Start the server: 

```bash
npm start
```

## API Endpoints

- `POST /user`: Create valid credentials (name, email, password)
- `POST /auth/login`: Login with valid credentials(name, email, password)
- `POST /auth/refresh`: Post the refresh token generated during authentication to get new access token
- `GET /todos`: Retrieve all TODO items
- `GET /todos/:id`: Retrieve a specific TODO item
- `POST /todos`: Create a new TODO item
- `PUT /todos/:id`: Update an existing TODO item
- `DELETE /todos/:id`: Delete a TODO item

## Docker Image
https://hub.docker.com/repository/docker/prakriti03/todo/general

