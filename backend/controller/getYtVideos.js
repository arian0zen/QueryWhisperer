const ytsr = require("ytsr");
const searchYouTubeVideos = require("../api/searchVideos");

const getYtVideos = async (req, res) => {
  try {
    let { query } = req.body;
    if (!query) {
      query = "Programming in 100 seconds";
    }
    const videos = await searchYouTubeVideos(query);
    // console.log("videos", videos);
    res.json(videos);
  } catch (errors) {
    console.log("error", errors);
    res.json({
      error: "well, this is awkward.. I don't know the answer for that",
    });
  }
};

module.exports = getYtVideos;
