require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const transScriptRouter = require("./routes/transScriptRouter");

// const conrsOptions = {
//   origin: 'https://transcript-generation-ft-ai-react.vercel.app',
//    // Specify the allowed origin
//   methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
//   allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
// };
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", transScriptRouter);
port = process.env.PORT || 5000;
(async () => {
  await connectDB(process.env.DATABASE_URI);
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
})();
