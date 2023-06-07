import About from "../models/aboutModel.js";

const getAbout = async (req, res) => {
  const getAboutSection = await About.find();

  return res.send({
    message: "About section",
    status: 200,
    data: getAboutSection,
  });
};

// exports.getAbout = async (req, res) => {
//   const response = await Aboutmodel.find({});
//   // return res.json({ response });
//   return res.send({ status: 200, data: response });
// };

const addAbout = async (req, res) => {
  const { description } = req.body;
  const addAboutSection = new About({ description });
  try {
    const savedAbout = await addAboutSection.save();
    res.json({
      message: "About added successfully",
      status: 200,
      data: savedAbout,
    });
  } catch (error) {
    res.json({
      message: "About Addition failed",
      status: 203,
    });
  }
};

const editAbout = async (req, res) => {
  const aboutId = req.params.id;
  try {
    if (!req.body.description) {
      throw new Error("About update failed");
    }
    const updatedAbout = await About.findByIdAndUpdate(aboutId, req.body);
    res.json({
      message: "About updated successfully",
      status: 200,
      data: updatedAbout,
    });
  } catch (error) {
    res.json({
      message: "About update failed",
      status: 201,
    });
  }
};

const removeAbout = async (req, res) => {
  const aboutId = req.params.id;
  const deleteAbout = await About.findByIdAndDelete(aboutId);
  res.json({
    message: "About deleted successfully",
    status: 200,
    // data: deleteAbout,
  });
};

export default { getAbout, addAbout, editAbout, removeAbout };
