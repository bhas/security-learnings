# Security Training: Broken Access Control

This project is a project with an .NET api and a React UI app.

The application contains a number of security risks that you should try to identify and fix. 

## Prerequisites
You need to have docker installed

## Getting Started
#### Run via Docker (recommended)
1. Run the docker compose file with the command:
   ```sh
   docker-compose up --build
   ```
2. Navigate to http://localhost:3000 to open the application
   * The UI is found on http://localhost:3000
   * The API is found on http://localhost:8080

#### Alternatively
If you don't have docker you can also run the two solutions individually
1. Open the api solution and run the project. It will open the swagger page. Not down the url
2. Open the client project and make sure the .env file contains the base url of the api
3. run the client project with `npm install` followed by `npm run dev`
