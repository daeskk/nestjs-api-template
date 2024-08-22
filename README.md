# nestjs-api-template

Welcome to my Nestjs monorepo template/boilerplate! This is a monorepo project, which includes multiple services and leverages various technologies to provide a robust and scalable tools to build your project. Here I will list an overview of the main technologies, tools, some libs written by myself and how to use them.

## Technologies and tools

- **PostgreSQL**: A powerful and open-source relational database management system.
- **Swagger**: An elegant tool for documenting RESTful APIs.
- **RabbitMQ**: A robust and scalable messaging middleware for communication between distributed services.
- **Docker**: A platform known for running applications in containers, simplifying the development.

## General Division:

- `libs/common`: Used to store code shared across different parts on the system. Here, you will find generic functionalities, utilities, and common data models that can be used throughout the application.
- `api`: Core application, essentially the API for user client-server communication.
- `admin`: This directory contains the API related to system administration.
