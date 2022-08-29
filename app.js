require("dotenv").config();

const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

//GET

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

// POST

app.post("/api/users", userHandlers.validateUser, userHandlers.postUser); 
app.post("/api/movies", movieHandlers.validateMovie, movieHandlers.postMovie);

// UPDATE

app.put("/api/movies/:id", movieHandlers.validateMovie, movieHandlers.updateMovie),
app.put("/api/users/:id", userHandlers.validateUser, userHandlers.updateUser),

// LISTEN

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
