require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require ("langchain/prompts");

 const createModel = () =>
  new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: `gpt-3.5-turbo`,
    maxTokens: 400,
  });


 const executeTaskPrompt = new PromptTemplate({
  template:
    "You are an autonomous task execution AI called AgentGPT. You have the following objective `{goal}`. You have the following tasks `{task}`. Execute the task and return the response as a string.",
  inputVariables: ["goal", "task"],
});

module.exports = { createModel, executeTaskPrompt };
