const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://marcelekwaw:marcel1234@cluster0.86jxk9y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Przekierowanie z głównej ścieżki na /api/books
app.get('/', (req, res) => {
  res.redirect('/api/books');
});

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

// MongoDB connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log("📦 Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

