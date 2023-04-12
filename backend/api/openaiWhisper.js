require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const Transcripts = require("../models/Transcripts");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAiWhisper = async (url, mp3File) => {
  try {
    const openai = new OpenAIApi(configuration);
    const resp = await openai.createTranscription(
      fs.createReadStream(mp3File),
      "whisper-1"
    );
    await Transcripts.create({videoUrl: url, transcript: resp.data.text});
    return resp;
  } catch (err) {
    return err;
  }
};

module.exports = openAiWhisper;
