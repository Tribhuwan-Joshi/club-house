const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  story: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
