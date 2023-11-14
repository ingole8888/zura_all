const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authroute",
      required: true,
    },
    Email: { type: String },
    respondents: [{
      rpdetails: String,
      rptringS: String,
    }],
  },
  { timestamps: true }
);

const complainModel = mongoose.model("usercard", complainSchema);

module.exports = complainModel;
