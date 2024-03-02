const getFormSchema = require("../modal/formSchema");

exports.submitForm = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  
  try {
    const { Fname, Lname, email, password, adress, MobileNo } = req.body;

    // Check if email already exists
    const existingForm = await getFormSchema.findOne({ email });
    if (existingForm) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const { filename, originalname, mimetype, size } = req.file;

    const formData = new getFormSchema({
      Fname,
      Lname,
      email,
      password,
      MobileNo,
      adress,
      file: {
        name: originalname,
        type: mimetype,
        size: size,
        filename: filename,
      },
    });

    await formData.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Get Api
exports.getFormData = async (req, res) => {
  try {
    // Fetch all form data from the database
    const formData = await getFormSchema.find();

    // Send the retrieved data as a response
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Delete api
exports.deleteFormData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFormData = await getFormSchema.findByIdAndDelete(id);

    if (!deletedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Eddit api

exports.editFormData = async (req, res) => {
  try {
    const { id } = req.params;
    const { Fname, Lname, email, password, address, file, MobileNo } = req.body;

    // Check if the form data with the given ID exists
    const formData = await getFormSchema.findById(id);
    if (!formData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    // Update the form data
    formData.Fname = Fname;
    formData.Lname = Lname;
    formData.email = email;
    formData.password = password;
    formData.address = address;
    formData.file = file;
    formData.MobileNo = MobileNo;

    // Save the updated form data
    await formData.save();

    res
      .status(200)
      .json({ message: "Form data updated successfully", formData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
