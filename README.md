# Project 2: Drill and Practice!

##Description

Project 1 for the course Web Software Development at Aalto University (https://fitech101.aalto.fi/web-software-development/).

It is a web application designed for repeated practice of learned content. It provides a list of topics and allows users to create multiple-choice questions within those topics. Registered and authenticated users can answer the questions, add new ones or see questions provided by others. The application also displays basic statistics. Additionally, the application offers an API for retrieving and answering random questions.

The project follows a three-tier architecture (client, server, database) and a layered architecture with four layers: views, controllers, services, and database.

##Features

- **Registration/authentication:** Users can register and log in to view exclusive pages. 
- **List of topics:** Users can view a list of available topics.
- **Create questions:** Users can create multiple-choice questions within specific topics.
- **Answer questions:** Users can answer the questions themselves, add new ones or view answers provided by others.
- **Basic statistics:** The application displays statistics.
- **API for random questions:** The API allows users to retrieve and answer random questions programmatically.

## Technologies Used

- **JavaScript:** programming language
- **Deno:** as the runtime environment
- **Eta:** HTML views
- **SQL:** databases
- **Docker:** containerization and deployment
- **Render:** Online delpoyment of website and databases

## Getting started

Can be started on command line with "docker-compose up" on the root directory of the project and accessing http://localhost:7777.
Database can be accessed in separate terminal with "docker exec -it [container_name from ./docker-compose.yml] psql".

or

Accessed via https://wsd-project2onlinedeployment.onrender.com/ (might take a bit for Render to start the server).

##Tests

After starting the program locally, tests can be run with command on the root of the project directory: "docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf".