require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const connectToDatabase = require("./src/configs/connectToDatabase");
const authRoutes = require("./src/app/routes/Routes");
const greetingMiddleware = require("./src/app/middlewares/greetingMiddleware");
const MongoStore = require("connect-mongo");

const app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/resource/views"));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layouts/app");

// Serve static files
app.use(express.static(path.join(__dirname, "src/public")));
app.use(
  "/public/assets",
  express.static(path.join(__dirname, "src/public/assets"))
);

// Connect to MongoDB
connectToDatabase();

// Middleware for session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
  })
);

// Global middleware for greeting
app.use(greetingMiddleware);

// Parse request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
