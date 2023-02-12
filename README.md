# pokemon-challenge-api

## Description:
A simple JavaScript API built using **nestjs** framework, **postgres** database and **Prisma** ORM.

## Project Structure:
### Folders:
- **assets**: Static files. Holds the csv used to seed the db.
- **auth**: Holds all logic related to the **Authentication** and **Authorization** using [Passport](http://www.passportjs.org/)
- **common**: Holds logic that could be used across the code.
 - **pipes**: Holds logic for pipes used in the controllers.
    - joi: Validates a request input using [Joi](https://joi.dev/api/?v=17.7.0). This approach was used because DTOs definition didn't work with JavaScript and needed a way to validate user's input.
  - **math**: math related functions.
- **database**: Holds migration, schema, seed files.
- **entities**: Holds nestjs components along with any joi schemas needs to validate an input. We only have two entities in the api **users** and **pokemons**.
- **guards**: Mostly used to wrap guards provided by Passport instead of calling them by name.
- **providers**: Holds components needed across the api (caches, ORMs, etc.)
  - prisma: Handles PrismaClient initalization. 

## Endpoints:
- **GET** /pokemons*?page=#&limit=#*: returns a list pokemons details. The endpointaccepts two query params *page* and *limit* default values are *1* and *10*.
- **GET** /pokemons/*id*: fetches a specific pokemon by id.
- **GET** /pokemons/damage*?atkId&defId*: retruns the possible damage. Both Ids are required.
- - **POST** pokemons/ringFight: returns rounds and the winner of each fight. 
  - Body: 
  -```json
  {
    "ids: [1,2, 3, 4]
  }
   ```
   - Response: 
  -```json
  {
    "2": [
        {
            "winnerId": 4,
            "atkId": 3,
            "defId": 4
        }
    ],
    "4": [
        {
            "winnerId": 4,
            "atkId": 1,
            "defId": 4
        },
        {
            "winnerId": 3,
            "atkId": 2,
            "defId": 3
        }
    ]
}
   ```

- **POST** auth/login: returns jwt token for a user. 
  - Body: **Database will be seeded with the following user**
  -```json
  {
    "email": "user@test.com",
    "password": "password"
  }
   ```
## Installation:

```bash
$ npm install
```

## Running the API:
Generate a .env file in the api main directory and set the following env variables:
```
JWT_SECRET= #secret used to sign generated jwt tokens

DATABASE_URL=  #Postgres database
```
 ### Locally:
 To run locally run the follwing CMD in the given order:
```bash
npm run prisma:migrate #This runs the generate migration files, generates the prisma client and seeds the database.

npm run start:dev #To start the api service using nodemon.

```
### Using docker:
```bash
docker-compose up -d #This will build a postgres docker image and uses it as the api database. Don't forget to set the host of DATABASE_URL env variable to db
```
## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## Possible Enhancements:
- Use TypeScript instead as the framework is tailored for it. This will allow us to make use of DTOs and remove the JoiValidationPipe.
- Better response in case a pokemon is not found.
- Custom errors. 
- Test the modules as a whole. 
