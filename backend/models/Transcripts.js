const mongoose = require("mongoose");

const transcriptSchema = mongoose.Schema(
  {
    videoUrl : { type: String, required: true, unique: true },
    transcript: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transcripts", transcriptSchema);
