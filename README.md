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

API Endpoints:

User Routes:
POST /signup: Create a new user account.
POST /signin: Sign in with existing user credentials.
GET /signout: Sign out the current user.
GET /home: Home page route (requires authentication).


Post Routes:
POST /create: Create a new post.
GET /get: Get posts created by the authenticated user.
GET /getall: Get all posts.
PUT /update/:id: Update a post by its ID.
DELETE /delete/:id: Delete a post by its ID.
GET /postsbylocation: Get posts based on latitude and longitude.
GET /count: Get counts of active and inactive posts.


Middleware:
jwtAuth: Middleware for JWT authentication. Used to protect routes that require authentication.


Controllers:
UserController: Manages user-related operations (signup, signin, signout).
PostController: Manages post-related operations (create, read, update, delete, count, posts by location).


Models:
UserModel: Represents the schema for user data.
PostModel: Represents the schema for post data.


Repositories:
UserRepository: Handles database operations related to users.
PostRepository: Handles database operations related to posts.


Dependencies:
bcrypt: Used for hashing passwords.
jsonwebtoken: Used for generating and verifying JSON Web Tokens (JWT).
express: Web framework for Node.js.
mongoose: MongoDB object modeling tool.
dotenv: Loads environment variables from a .env file.


Author:
Pratik more
