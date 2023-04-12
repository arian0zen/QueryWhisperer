require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const TranscriptsModel = require("./models/Transcripts");
const transScriptRouter = require("./routes/transScriptRouter");
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
