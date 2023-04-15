require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const transScriptRouter = require("./routes/transScriptRouter");
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Request-Headers', '*');
  if (req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Methods', '*');
    return res.status(200).json({});
  }
  next();
});
const corsOptions = {
  origin: '*',
   // Specify the allowed origin
  methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
};
// app.use(cors(corsOptions));
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
