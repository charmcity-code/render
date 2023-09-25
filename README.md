# Demonstrate CRUD Routes with Postman

## Overview

In this demo, you will learn how to use a server that features CRUD routes to create, read, update, and delete data from a PostgreSQL database. You will also learn how to use Postman to test the CRUD routes of a server.

## CRUD Routes

CRUD stands for Create, Read, Update, and Delete. These are the four basic operations that can be performed on data. In this demo, you will learn how to use a server that features CRUD routes to create, read, update, and delete data.

## Postman

Postman is a tool that allows you to test API routes. It is a great tool to use when you are developing an API. In this demo, you will use Postman to test the CRUD routes of a server.

## PostgreSQL

Be sure that your PostgreSQL database is running before you start this demo.

Login as a user with the `SUPERUSER` role. You can do this by running the following command in your terminal:

```bash
psql -U postgres
```

Create a new database called `biznus`:

```sql
CREATE DATABASE biznus;
```

## Demo
1. Clone this repo. 
2. Navigate to the `demo` folder.
3. Run `npm install` to install the dependencies.
4. Run `npm run seed` to seed the database.
5. Run `npm start` to start the server.
6. Open Postman.
7. Create a new request for each of the following routes:
    - `GET http://localhost:8080/api/sales`
    - `GET http://localhost:8080/api/sales/1`
    - `POST http://localhost:8080/api/sales`
    - `PUT http://localhost:8080/api/sales/1`
    - `DELETE http://localhost:8080/api/sales/1`
8. Write new routes for `http://localhost:8080/api/purchases`. 
