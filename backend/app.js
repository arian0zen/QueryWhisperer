require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const transScriptRouter = require("./routes/transScriptRouter");

// const corsOptions = {
//   origin: 'https://transcript-generation-ft-ai-react.vercel.app',
//    // Specify the allowed origin
//   methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
//   allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
// };

const corsOptions = {
  origin: "http://localhost:3000",
  // Specify the allowed origin
  methods: "GET, POST, PUT, DELETE", // Specify the allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Specify the allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", transScriptRouter);
app.get("/inactive", (req, res) => {
  res.send("ok");
});

// setInterval(function() {
//   // do something here or leave it as it is
//   console.log('INTERVAL',new Date().toLocaleString());
//   fetch('https://transcript-generator-api.onrender.com/inactive')
// }, 300000)

port = process.env.PORT || 5000;
(async () => {
  await connectDB(process.env.DATABASE_URI);
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
})();
