import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // get the token
  const token = req.headers["authorization"];
  // if no token throw err
  if (!token) {
    res.status(401).send("Unauthorized");
  }

  // verify the token

  try {
    const payload = jwt.verify(token, process.env.JWT);

    req.userID = payload.userID;
  } catch (err) {
    console.log("error in verifing token" + err);
    res.status(401).send("Unauthorized");
  }

  // call next middleware
  next();
};

export default jwtAuth;
