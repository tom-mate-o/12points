require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectionString = process.env.MONGO_DB_CLIENT;
console.log("Connecting to MongoDB...");

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
// Schemas ----------------------------------------------
// Schema for Post

const Post = require("./models/postSchema");

// Schema for User

const User = require("./models/userSchema");


// Routes ----------------------------------------------
// POST Route for Post

const postRoute = require("./routes/postRoute"); // Pfad zur Post-Route
app.use("/api/post", postRoute);

// POST Route for Register
// ...down below because of (Multipart Form Data/Multer)

// GET Route for Posts aus Pool
const getPoolRoute = require("./routes/getPoolRoute"); // Pfad zur Get-Route
app.use("/api/getPool", getPoolRoute);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

app.get("/health-check", (req, res) => {
  res.status(200).send({ message: "I'm alive! Greetings from the backend!" });
});

// Middleware - Multipart Form Data ----------------------------------------------

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const avatar = multer({ storage });

// Middleware für multipart formdata
app.use(express.urlencoded({ extended: true }));

// POST Route for Register ------------------------------------------------------

app.post("/api/register", avatar.single("avatar"), async (req, res) => {
  try {
    const { id, avatar, email1, username, password1 } = req.body;

    if (!id || !email1 || !username || !password1) {
      return res.status(400).send({ message: "Required field is missing!" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "Username already taken!" });
    }

    const existingEmail = await User.findOne({ email: email1 });
    if (existingEmail) {
      return res.status(422).send({ message: "Email already taken!" });
    }

    let avatarUrl = null;
    if (req.file) {
      avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }
    console.log(avatarUrl);

    const hashedPassword = await bcrypt.hash(password1, 10);
    console.log(hashedPassword);

    const userToAdd = new User({
      id,
      avatarUrl,
      email: email1,
      username,
      hashedPassword,
    });

    console.log(userToAdd);

    const userCreated = await User.create(userToAdd);
    console.log("userCreated");
    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error while creating User!", error);
    res.status(500).send({ message: "Error while creating User!" });
  }
});
