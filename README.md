# HTTP Lab

HTTP Lab is an interactive application created to demonstrate how a REST API works in practice. Users can perform CRUD operations while viewing the HTTP method, endpoint, request body, response and status code in real time.

## Swagger Documentation

The project includes Swagger through an OpenAPI specification. Swagger is used to document the API, show the available endpoints and expected data, explain possible responses, and allow developers to test requests directly in the browser without an external tool.

## Technologies

- PHP
- JavaScript
- Axios
- Vite
- REST API
- Swagger / OpenAPI
- Docker

## Running Locally with Docker

```bash
docker compose up --build
```

Application: `http://localhost:8080`

Swagger: `http://localhost:8000/docs.html`

## Render Deployment

Deploy the backend as a Docker Web Service and the frontend as a Static Site. Set `VITE_API_URL` in the Static Site to the public backend URL followed by `/api`.

## License

This project was developed for educational and portfolio purposes.
