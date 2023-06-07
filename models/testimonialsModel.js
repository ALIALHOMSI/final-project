import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name"],
  },
  description: {
    type: String,
    required: [true, "Please fill the description"],
  },
});

const testimonial = mongoose.model("testimonial", testimonialSchema);
export default testimonial;
