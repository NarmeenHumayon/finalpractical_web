require("dotenv").config();
require('express-async-errors');

const connectDB = require("./database/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");

app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();


/*
const express = require('express');
require('express-async-errors');
const User = require('./models/user');
const app = express();
 
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});
As we all know express sends a function called next into the middleware, which then needs to be called with or without error to make it move the request handling to the next middleware. It still works, but in case of an async function, you don't need to do that. If you want to pass an error, just throw a normal exception:

app.use(async (req, res) => {
  const user = await User.findByToken(req.get('authorization'));
 
  if (!user) throw Error("access denied");
});
 
app.use((err, req, res, next) => {
  if (err.message === 'access denied') {
    res.status(403);
    res.json({ error: err.message });
  }
 
  next(err);
});


using npm details about 
*/
