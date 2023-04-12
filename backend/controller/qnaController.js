const fs = require('fs');
require('dotenv').config();
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { PineconeClient } = require("@pinecone-database/pinecone");
// Load your data
const qna = async(req, res) => {
    const filePath = '../data/field-guide-to-data-science.txt';
const data = `You have a family, I have a family. Your brother kills my son. So what do I do? I come and I kill your father and your cousin. And then you think, well, I killed your father and your cousin, I'm gonna come back and I'm gonna kill four of your people. And then I come back and say, yeah, no problem. It's 16 of you this time. And then you come back and you say, 16, eh? Let's try for 32. And so this is what happens. This is actually why justice systems are set up, by the way. There's a bunch of reasons justice systems are set up. And one is to punish the guilty. That's one. The other is to have the guilty repent. That's two. To maintain social order. That's three. Here's another one that no one ever thinks about. It's to alleviate you from the responsibility of revenge. That's what it's for. Because otherwise, what happens? You kill one, I kill two. You kill four, I kill eight. You kill 16. And soon, everyone's at war.`

console.log(`You have ${data.length} document(s) in your data`);
console.log(`There are ${data.length} characters in your document`);

// Chunk your data up into smaller documents
const textSplitter = new RecursiveCharacterTextSplitter({chunk_size: 1000, chunk_overlap: 0});
const texts = await textSplitter.splitText(data);
console.log(`Now you have ${texts.length} documents`);

// Create embeddings of your documents to get ready for semantic search
const { PineconeStore } = require('langchain/vectorstores/pinecone');
const OpenAIEmbeddings = require('langchain/embeddings/openai').OpenAIEmbeddings;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_API_ENV = 'asia-southeast1-gcp';

const embeddings = new OpenAIEmbeddings({openai_api_key: OPENAI_API_KEY});
// Initialize Pinecone
const pinecone = new PineconeClient();
await pinecone.init({
  environment: PINECONE_API_ENV,
  apiKey: PINECONE_API_KEY,
});

const index_name = "transcripts101";
const index = pinecone.Index(index_name);
const docsearch = await PineconeStore.fromTexts(texts, embeddings, {
    pineconeIndex: index,
    textKey: 'text',
  });

const query = "who kills my son?";
const docs = docsearch.similarity_search(query, {include_metadata: true});

// Query those docs to get your answer back
const OpenAI = require('langchain/llms').OpenAI;
const load_qa_chain = require('langchain/chains/question_answering').load_qa_chain;

const llm = new OpenAI({temperature: 0, openai_api_key: OPENAI_API_KEY});
const chain = load_qa_chain(llm, {chain_type: "stuff"});

const query2 = "who kills my son?";
const docs2 = docsearch.similarity_search(query2, {include_metadata: true});

chain.run({input_documents: docs2, question: query2});
};

module.exports = qna;