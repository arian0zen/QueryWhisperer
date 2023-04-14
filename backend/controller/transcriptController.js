const fs = require("fs");
const getTranscriptResponse = require("../api/getTranscript");
const storeEmbeddedTranscript = require("../api/storeEmbeddedTranscript");

const getTranscript = async (req, res) => {
  const url =
    req.body.url || "https://www.youtube.com/watch?v=8WbTacWuxn0";
  const mp3 = "audio-output.mp3";
    try{
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
    }catch(error){
        res.json({error: error.message});
        return;
    }
};

module.exports = getTranscript;
