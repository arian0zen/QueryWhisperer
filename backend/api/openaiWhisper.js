require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const Transcripts = require("../models/Transcripts");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const checkSize = async (filePath) => {
  try {
    var stats = fs.statSync(filePath);
    var fileSizeInBytes = stats.size;
    // Convert the file size to megabytes (optional)
    var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    return fileSizeInMegabytes;
  } catch (error) {
    return error;
  }
};
const openAiWhisper = async (url, mp3File, headerText) => {
  try {
    const sizeCheck = await checkSize(mp3File);
    if (sizeCheck > 9.96) {
      return { error: "File size is greater than 10MB, try smaller video" };
    }
    const openai = new OpenAIApi(configuration);
    const resp = await openai.createTranscription(
      fs.createReadStream(mp3File),
      "whisper-1"
    );
    const transcriptText = `${headerText} ${resp.data.text}`;

    /* --- this block of code is to execute when I am generating transcript for that demo video, i already have the mp3 chunks at 'demo-mp3' folder --- */
    /* < I would insert the below commented code here > */

    const createdMongoInstance = await Transcripts.create({
      videoUrl: url,
      transcript: transcriptText,
    });
    return { resp: transcriptText, createdMongoId: createdMongoInstance._id };
  } catch (err) {
    console.log("Error creating transcription: ", err.message);
    return err;
  }
};

module.exports = openAiWhisper;

// const getTranscript = async (outPutDirectory) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const files = await fs.promises.readdir(outPutDirectory);
//       const transcription = [];
//       files.sort((a, b) => {
//         const numA = parseInt(a.split("-")[1]);
//         const numB = parseInt(b.split("-")[1]);
//         return numA - numB;
//       });
//       // await Promise.all(
//       //   files.map(async (file)=>{
//       //     // const resp = await openai.createTranscription(
//       //     //   fs.createReadStream(`${outPutDirectory}/${file}`),
//       //     //   "whisper-1"
//       //     // );
//       //     let resp = await fetch(`https://catfact.ninja/fact`)
//       //     const data = await resp.json();
//       //     transcription.push(`${data.fact[0]} ${file}`)
//       //   })
//       // );
//       for (const file of files) {
//         const resp = await openai.createTranscription(
//           fs.createReadStream(`${outPutDirectory}/${file}`),
//           "whisper-1"
//         );
//         transcription.push(resp.data.text);
//         // transcription.push(resp.data.text);
//       }
//       const transcript = transcription.join("");
//       resolve(transcript);
//     } catch (error) {
//       console.log(`Failed to read directory: ${error}`);
//       reject(error);
//     }
//   });
// };

// const processedTranscript = await getTranscript("demo-mp3");
// fs.writeFile(
//   `./Documents/demo-8hour-video.txt`,
//   `ServiceNow Admin Full Course and document: ${processedTranscript}`,
//   (err) => {
//     if (err) {
//       console.log(`Failed to write file`);
//       return;
//     }
//   }
// );
