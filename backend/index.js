const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

//importing environment variables
require("dotenv/config");

//importing routes
const profileRoutes = require("./routes/profile.routes");

const app = express();

const staticFilesDir = path.join(__dirname, "public");

//api prefix
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticFilesDir));
app.use(morgan("dev"));
app.use((err, req, res, next) => {
	res.send(err);
});

//routes
app.use(`${api}/profiles`, profileRoutes);

//connecting to the database
mongoose
	.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to db successfully ...");
	})
	.catch((err) => {
		console.log(err);
	});

//starting the server
app.listen(8000, () => {
	console.log("Server is up and running at http://localhost:8000/");
});
