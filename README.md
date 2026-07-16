# HTTP Lab

HTTP Lab is an interactive application created to demonstrate how a REST API works in practice. Instead of only explaining HTTP methods, the project lets users perform real CRUD operations while visualizing the communication between the frontend and backend.

## Features

- Interactive landing page
- CRUD modules for Products, Users, Tasks, Clients and Service Tickets
- REST API built with PHP
- HTTP request and response panel
- Responsive interface
- English and Portuguese support
- Docker support

## Swagger Documentation

The project includes Swagger through an OpenAPI specification to document the API.

Swagger is included so developers can view all endpoints, understand the expected request data, inspect responses and status codes, and test the API directly from the browser without needing an external tool such as Postman. This makes the API easier to understand, test and integrate.

## Technologies

- PHP
- JavaScript
- Axios
- REST API
- Swagger / OpenAPI
- Docker

## Running Locally

```bash
docker compose up --build
```

Application:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/docs.html
```

## Deploying on Render from GitHub

1. Push the complete project to a GitHub repository.
2. Open the Render Dashboard.
3. Select **New > Blueprint**.
4. Connect the GitHub repository.
5. Render will automatically detect the `render.yaml` file.
6. Confirm the two services and apply the Blueprint.

The Blueprint creates:

- `http-lab-api`: PHP backend service
- `http-lab`: frontend service with an internal proxy to the backend

No manual API URL configuration is required.

## License

This project was developed for educational and portfolio purposes.
