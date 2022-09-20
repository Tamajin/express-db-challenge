require("dotenv").config();

const express = require("express");

const app = express();

const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

// Public routes

app.get("/", welcome);


app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword)
app.post("/api/users", hashPassword, userHandlers.postUser);

// Private routes

app.use(verifyToken);
app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
