const fs = require("fs");
const getTranscriptResponse = require("../api/getTranscript");


const getTranscript = async (req, res)=>{
    const url = req.body.url || "https://www.youtube.com/shorts/QXNtncuomu8";
    const mp3 = "audio-output.mp3";
    const transcriptData = await getTranscriptResponse(url, mp3);
    if(transcriptData.newFileCreated === true){
        fs.unlink(mp3, (err) => {
            if (err) {
              res.json({ error: "something went wrong" });
              return
            }
        });
        fs.writeFile('transcript.txt', transcriptData.transcriptText, (err) => {
            if (err) {
                res.json({ error: "something went wrong" });
                return
            }
            });
    }
    if(transcriptData.success === true){
        res.json({ transcriptData: transcriptData });
        return
    }else{
        res.json({ error: transcriptData.error });
    }
  }

 module.exports = getTranscript