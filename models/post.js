const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  story: { type: String, required: true },
});

PostSchema.virtual("postDate").get(function () {
  const formattedDate = this.date.toLocaleString("en-GB", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  return formattedDate;
});

module.exports = mongoose.model("Post", PostSchema);
