import Testimonial from "../models/testimonialsModel.js";

const getAll = async (req, res) => {
  const getAllTestimonials = await Testimonial.find();
  res.json({
    message: "Testimonials:",
    status: 200,
    data: getAllTestimonials,
  });
};

const getOne = async (req, res) => {
  const testimonialId = req.params.id;
  const getOneTestimonial = await Testimonial.findById(testimonialId);
  res.json({
    message: "Testimonial",
    status: 200,
    data: getOneTestimonial,
  });
};

const deleteTestimonial = async (req, res) => {
  const testimonialId = req.params.id;
  const removeOne = await Testimonial.findByIdAndDelete(testimonialId);
  res.json({
    message: "Testimonial deleted successfully",
    status: 200,
    data: removeOne,
  });
};

const editTestimonial = async (req, res) => {
  const testimonialId = req.params.id;
  try {
    const updatedtestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      req.body
    );
    res.json({
      message: "testimonial updated successfully",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "testimonial updated failed",
      status: 203,
    });
  }
};

const addTestimonial = async (req, res) => {
  const { name, description } = req.body;
  const newTestimonial = new Testimonial({ name, description });
  try {
    const savedTestimonial = await newTestimonial.save();
    res.json({
      message: "testimonial added successfully",
      status: 200,
      data: savedTestimonial,
    });
  } catch (error) {
    res.json({
      message: "Please fill the name and description ",
      status: 201,
    });
  }
};
export default {
  getAll,
  addTestimonial,
  getOne,
  deleteTestimonial,
  editTestimonial,
};
