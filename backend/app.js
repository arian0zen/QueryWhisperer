require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const transScriptRouter = require("./routes/transScriptRouter");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const corsOptions = {
  origin: 'http://localhost:3000',
   // Specify the allowed origin
  methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", transScriptRouter);
// app.get("/scrape", async (req, res) => {
//   const model = new ChatOpenAI({ temperature: 0 });
//   const embeddings = new OpenAIEmbeddings({
//     openAIApiKey: OPENAI_API_KEY,
//   });
//   const webBrowser = new WebBrowser({ model, embeddings });
//   const url = `https://www.xero.com/advisors/find-advisors/?type=advisors&orderBy=ADVISOR_RELEVANCE&sort=ASC&pageNumber=1`;
//   const query = `give me emails that are on this pa ?`
//   const result = await webBrowser.call(`${url}, ${query}`);
//   res.send(result);

// });

// setInterval(function() {
//   // do something here
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
