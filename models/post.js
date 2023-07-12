const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  creator: { type: Schema.Types.String, ref: "user" },
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  story: { type: String, required: true },
});

PostSchema.virtual("postDate").get(function () {
  const formattedDate = this.date.toLocaleDateString("en-GB", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
});

module.exports = mongoose.model("Post", PostSchema);
