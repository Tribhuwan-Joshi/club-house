const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  joinDate: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.virtual("joinedDate").get(function () {
  const formattedDate = this.joinDate.toLocaleString("en-GB", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  return formattedDate;
});
module.exports = mongoose.model("User", UserSchema);
