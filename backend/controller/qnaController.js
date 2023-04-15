const fs = require("fs");
require("dotenv").config();
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeClient } = require("@pinecone-database/pinecone");
const { OpenAI } = require("langchain/llms/openai");
const { loadQAStuffChain } = require("langchain/chains");
const e = require("express");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_API_ENV = "asia-southeast1-gcp";

const qna = async (req, res) => {
try{
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY,
  });
  const client = new PineconeClient();
  await client.init({
    environment: PINECONE_API_ENV,
    apiKey: PINECONE_API_KEY,
  });
  const index_name = "transcript-yt";
  const pineconeIndex = client.Index(index_name);
  const docSearch = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });
  const query = req.body.query || "Why was Donald Trump arrested ?";

  const searchResults = await docSearch.similaritySearch(query, 5);

  const llm = new OpenAI({
    temperature: 0.7,
    openAIApiKey: OPENAI_API_KEY,
  });

  const chain = loadQAStuffChain(llm);
  const responseAns = await chain.call({
    input_documents: searchResults,
    question: query,
  });
  res.json(responseAns);
}catch(errors){
  console.log("error", errors);
  res.json({error: "well, this is awkward.. I don't know the answer"});
}
};

module.exports = qna;
