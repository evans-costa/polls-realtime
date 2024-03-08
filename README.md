<h1 align="center">
  <br>
   Poll Creator
  <br>
</h1>
<h4 align="center">A poll creator using <a href="https://fastify.dev/" target="_blank">Fastify</a>, <a href="https://redis.io/" target="_blank">Redis</a> and real time voting results with WebSockets</h4>

<div align='center'>

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

</div>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#motivation">Motivation</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Create a poll with title and the options to vote using PostgreSQL with Prisma as a ORM.
- Get the poll created with number of votes ranked.
- Voting on a poll, the number of each votes will be stored using Redis as a database.
- When accessing the WebSocket endpoint, you will subscribe to the results of this poll.
- Everytime you vote, if a WebSocket connection is estabilished, all subscribers get the results in real time.

## Motivation

How real-time communication works is important, many modern applications and services works with WebSockets, e.g. real-time chat. I learned the Pub/Sub pattern, when a Subscriber makes an inscription on a channel or topic and a Publisher publishes the message in this channel and the Subscribers consumes this message. For that application, using Redis as an in-memory database was very important to learn the use-cases of this database and, because of its fast read and write operations, it is one of the first choices on a chat application and message systems.

## How To Use

- To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) and [Docker](https://www.docker.com/get-started/) with [Docker Compose](https://docs.docker.com/compose/install/) installed on your computer. From your command line:

  ```bash
  # Clone this repository
  $ git clone https://github.com/evans-costa/polls-realtime.git

  # Go into the repository
  $ cd polls-realtime
  ```

  ```bash
  # Install dependencies
  $ npm install
  ```

- Rename the `.env.example` file to `.env` and fill it accordingly:

  ```env
  PORT=

  POSTGRES_USER=local_user
  POSTGRES_PASSWORD=local_password
  POSTGRES_DB=polls
  POSTGRES_HOST=localhost
  POSTGRES_PORT=54325

  DATABASE_URL=postgresql://local_user:local_password@localhost:54325/polls?schema=public

  SECRET_KEY=
  ```

- Run the command to up Postgres and Redis containers:

  ```bash
  # Up the containers
  $ npm run services:up
  ```

  This will up a Redis and a PostgreSQL container on your Docker installation.

- Run the Prisma migrations:

  ```bash
  # Run the migrations
  $ npm run migrate:dev
  ```

- Run the server:
  ```bash
  # Run the project
  $ npm run dev
  ```
- If you would like to access the database by a GUI, Prisma comes with a built-in GUI to view and edit the data, from your command line:

  ```bash
  # Access the Prisma Studio
  $ npm run prisma:studio
  ```

- Now you can test it in your favorite API Testing Platform ([Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com/), [Hoppscotch](https://hoppscotch.io/))

### HTTP endpoints

- The API will be accessible at http://localhost:3000 (or in the port setted in `.env` file)
- The API provides the following HTTP endpoints and the body requests / responses:

  #### Creating a poll:

  ```markdown
  POST /polls
  ```

  - Request Body:

    ```json
    {
      "title": "Qual melhor framework web para NodeJS?",
      "options": ["Express", "Fastify"]
    }
    ```

  - Response Body:

    ```json
    {
      "pollId": "194cef63-2ccf-46a3-aad1-aa94b2bc89b0"
    }
    ```

  #### Creating a vote on a poll:

  ```markdown
  POST /polls/{pollId}/votes
  ```

  - Request Body:

    ```json
    {
      "pollOptionId": "c5271ca0-3c5b-4a81-af94-284bfbfd49b1"
    }
    ```

  #### Get a poll by its ID:

  ```markdown
  GET /polls/{pollId}
  ```

  - Response Body:

    ```json
    {
      "poll": {
        "id": "194cef63-2ccf-46a3-aad1-aa94b2bc89b0",
        "title": "Qual a melhor framework web para NodeJS?",
        "options": [
          {
            "id": "c5271ca0-3c5b-4a81-af94-284bfbfd49b1",
            "title": "Express",
            "score": 2
          },
          {
            "id": "780b8e25-a40e-4301-ab32-77ebf8c79da8",
            "title": "Fastify",
            "score": 1
          }
        ]
      }
    }
    ```

### WebSocket endpoint

- The WebSocket endpoint is at:

  ```markdown
  ws://localhost:3000/polls/{pollId}/votes
  ```

- Everytime when voted on a poll, the WebSocket endpoint will publish the following message:

  ```json
  {
    "pollOptionId": "c5271ca0-3c5b-4a81-af94-284bfbfd49b1",
    "votes": 2
  }
  ```

## Credits

This project was made for NLW #14 Expert by Rocketseat and uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/)
- [Redis](https://redis.io/)
- [Fastify](https://fastify.dev/)

## License

The MIT License (MIT) 2024 - Evandro Costa. Please have a look at the LICENSE for more details.

---

> GitHub [@evans-costa](https://github.com/evans-costa) &nbsp;&middot;&nbsp;
> LinkedIn [@evandro-souzac](https://www.linkedin.com/in/evandro-souzac/)
