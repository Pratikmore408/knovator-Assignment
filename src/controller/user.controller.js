import UserModel from "../model/user.model.js";
import UserRepository from "../repository/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    // import repository
    this.userRepository = new UserRepository();
  }
  async getHome(req, res) {
    res.status(200).send("This is Home Page");
  }

  async signup(req, res) {
    // get elements from body
    const { name, email, password, confirmPassword } = req.body;

    try {
      // check if both passwords are same or not
      if (password !== confirmPassword) {
        // if not return error
        res.status(503).send("Passwords and confirmpassword should be same");
      } else {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        // create new user model
        const newUser = new UserModel(name, email, hashedPassword);
        // save the user in db
        const savedUser = await this.userRepository.signUp(newUser, email);

        res.status(200).send(savedUser);
      }
    } catch (err) {
      // return err with err msg
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      // get the user from db
      const user = await this.userRepository.signIn(email);
      // if user not exist then throw err
      if (!user) {
        return res.status(400).send("Incorrect Credentials ");
      } else {
        // if exist the compare the hashed password
        const result = await bcrypt.compare(password, user.password);
        // if password matched the generate and return the token
        if (result) {
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).send(token);
        } else {
          // if password don't match then throw err
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("something wrong in signIn");
    }
  }

  async signOut(req, res) {
    try {
      // destroy the session
      req.session.destroy((err) => {
        if (err) {
          // if err print the err
          console.log(err);
        } else {
          res.status(200).send("Logout Successful");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
