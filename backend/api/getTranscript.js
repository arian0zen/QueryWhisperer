const ytdl = require("ytdl-core");
const fs = require("fs");
const openAiWhisper = require("./openaiWhisper");
const Transcripts = require("../models/Transcripts");

const getTranscriptResponse = async (url, mp3) => {
  try {
    const foundVideo = await Transcripts.findOne({ videoUrl: url });
    if (foundVideo) {
      return { success: true, newFileCreated: false, transcriptText: foundVideo.transcript };
    } else {
      const info = await ytdl.getInfo(url);
      const video = ytdl(url, { filter: "audioonly" });
      const writeStream = fs.createWriteStream(mp3);
      video.pipe(writeStream);
      const fileCreationPromise = new Promise((resolve) => {
        writeStream.on("finish", () => {
          resolve();
        });
      });
      await fileCreationPromise;
      const transcriptText = await openAiWhisper(url, mp3);
      return { success: true, newFileCreated: true, transcriptText: transcriptText.data.text };
    }
  } catch (error) {
    console.log("error", error.message);
    return { success: false,  newFileCreated: false, error: error.message };
  }
};

module.exports = getTranscriptResponse;
