require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require("./db/connect")
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3000
const authenticateUser = require("./middleware/authentication")

const app = express();


// Routers
const authRouter = require("./routes/auth")
const jobshRouter = require("./routes/jobs")

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticateUser, jobshRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// connect DB
connectDB(MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
}).catch(err => console.log(err.message))