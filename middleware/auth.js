const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({msg: "Unauthorized. Please add valid token"});
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, name } = decoded
    req.user = { id, name }
    next()
  } catch (error) {
    return res.status(401).json({msg: "HTTP 401: Unauthorized. Please add valid token"});
  }
}

module.exports = authenticationMiddleware;


/*
// Filename - index.js

const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();

// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

// Main Code Here //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
*/