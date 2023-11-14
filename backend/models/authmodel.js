const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  fname: { type: String},
  lname: { type: String },
  profile: { type: Number },
  email: { type: String}
},
  { timestamps: true }

)

const AuthModel = mongoose.model("userdata", userSchema)


module.exports = AuthModel