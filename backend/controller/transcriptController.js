const fs = require("fs");
const getTranscriptResponse = require("../api/getTranscript");
const storeEmbeddedTranscript = require("../api/storeEmbeddedTranscript");

const getTranscript = async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://transcript-generation-ft-ai-react.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const url = req.body.url;
  const mp3 = "audio-output.mp3";
  try {
    const transcriptData = await getTranscriptResponse(url, mp3);
    if (transcriptData.newFileCreated === true) {
      fs.unlink(mp3, (err) => {
        if (err) {
          res.json({ error: "something went wrong" });
          return;
        }
      });
      fs.writeFile(
        `./Documents/${transcriptData.mongoId}.txt`,
        transcriptData.transcriptText,
        (err) => {
          if (err) {
            res.json({ error: "something went wrong" });
            return;
          }
        }
      );
      await storeEmbeddedTranscript(
        `./Documents/${transcriptData.mongoId}.txt`
      );
    }
    if (transcriptData.success === true) {
      fs.unlink(`./Documents/${transcriptData.mongoId}.txt`, (err) => {
        if (err) {
          return;
        }
      });
      res.json({
        transcriptData: transcriptData,
        message: "now you can ask question about this",
      });
      return;
    } else {
      res.json({ error: transcriptData.error });
      return;
    }
  } catch (error) {
    res.json({ error: error.message });
    return;
  }
};

module.exports = getTranscript;
