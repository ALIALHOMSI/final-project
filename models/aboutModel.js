import mongoose from "mongoose";

const aboutSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please fill the description"],
  },
});

const about = mongoose.model("about", aboutSchema);
export default about;
