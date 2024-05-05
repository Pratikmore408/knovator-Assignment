node js api for user to signup and signin
and for post to perform crud operation on post 


Project Structure

The project follows a scalable folder structure with separate folder for controller, routes, and views, model, schemas, config and middleware:

models: Contains MongoDB schema definitions for Users. controllers: Implements the business logic for handling various API endpoints. routes: Defines the API routes and connects them to the respective controller functions. config: Includes configuration files, such as database connection and node mailer setup middleware: Includes the auth middleware and googleoAuth middleware for authentication

Installation Clone the repository to your local machine

Navigate to the project directory Install dependencies using npm install

Create a .env file in the root directory and configure the following environment variables:
SECRET,
DB_PASSWORD,
JWT.

makefile Copy code PORT=4000

DB_PASSWORD = your mongodb atlas password or you can change the entire url to localhost/127.0.0.1/dbname to connect with the local mongodb

To start the server, run the following command: node index.js

Video Demonstration For a detailed demonstration of the project, including folder structure explanation and app usage with crome browser, please refer to the following video:https://www.youtube.com/watch?v=2SyoiI9X9Qw
