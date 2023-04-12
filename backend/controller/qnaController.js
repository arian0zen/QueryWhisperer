const fs = require("fs");
require("dotenv").config();
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeClient } = require("@pinecone-database/pinecone");
const { OpenAI } = require("langchain/llms/openai");
const { loadQAStuffChain, loadQAMapReduceChain } = require("langchain/chains");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_API_ENV = "asia-southeast1-gcp";
const qna = async (req, res) => {
  // Load your data
  const loader = new TextLoader("./documents/demo-video-transcript.txt");
  const documents = await loader.load();
  console.log(`you have ${documents.length} documents`);
  console.log(
    `you have ${documents[0].pageContent.length} charecter in your document`
  );
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunk_size: 1000,
    chunk_overlap: 0,
  });
  const texts = await textSplitter.splitDocuments(documents);
  console.log(`Now you have ${texts.length} documents`);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY, // replace "YOUR-API-KEY" with your actual OpenAI API key
  });
  const client = new PineconeClient();
  await client.init({
    environment: PINECONE_API_ENV,
    apiKey: PINECONE_API_KEY,
  });
  const index_name = "arian";
  const pineconeIndex = client.Index(index_name);
  const docSearch =  await PineconeStore.fromDocuments(texts, embeddings, {
    pineconeIndex,
  });
  const query = "what is the evaluation criteria, in details ? ";

  const searchResults = await docSearch.similaritySearch(query, 1);

  const llm = new OpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const chain = loadQAStuffChain(llm)
  const responseAns = await chain.call({
    input_documents: searchResults,
    question: query,
  })
  res.json(responseAns)

};

module.exports = qna;
