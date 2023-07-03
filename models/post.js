const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post", PostSchema);
