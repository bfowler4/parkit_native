# Smart Park
> An application that connects users looking for parking with home owners who have an empty driveway or parking stall that they are willing to share

## Introduction
- __Backend__
    - **Express** as the application server
    - **PostgreSQL** as the database server
    - **Bookshelf.js** as the ORM
    - **passport.js** for Authentication and Authorization

- __Frontend__
	- **React.js** as FE framework
	- **Sass** for styling
	- **Webpack** for bundling, provided by FE generator.

## Project Setup
- clone repo
- install dependencies ```npm install```
- Create database with appropriate owner
- Enable PostGIS on database using ```CREATE EXTENSION postgis;```
  - https://postgis.net/install/
- Create 'config' folder. Create a 'index.js' file within the config folder with the following structure:
``` 
{
  database: {
    user: 'database_user',
    password: 'user_password',
    database: 'database_name'
  },
  passport: {
    secret: 'secret_keyword',
    saltRounds: 'number_of_salts'
  },
  stripe: {
    secretKey: 'secret_key'
  }
}
```
- ```cd server``` and run ```knex migrate:latest``` to create the database tables
- run ```knex seed:run``` to insert filler data into the database
- run back-end server and front-end server from the same terminal with ```npm run dev```

## Business Requirements

### MVP

#### Space Owner
- Allow a space owner to create an account and register a space that they are willing to allow others to rent
  - Name
  - Email
  - Password
  - Address
    - Street
    - Apartment #
    - City
    - State
    - Zipcode
- Allow space owners to set a payout method (Stripe)
- Allow space owners to set a schedule for when the space is available for parking by users
- Allow space owners to update their schedule and terminate service

#### User
- Allow a user to create an account
  - Name
  - Email
  - Phone
  - License Plate
- Allow a user to set a payment method (Stripe)
- Allow a user to rent a space for a set amount of time
  - User should be able to drop a pin depicting where they would like the space to be located near to
  - User should be able to select the day and time period that they would like to rent the space
  - User should be assigned a space for the specified time period