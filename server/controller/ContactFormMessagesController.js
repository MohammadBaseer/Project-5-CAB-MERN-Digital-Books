import ContactFormMessagesModel from "../models/ContactFormMessagesModel.js";

const insertContactFormMessages = async (req, res) => {
  console.log("Worked");

  if (!req.body.name) {
    res.status(400).json({ error: " Name is empty* " });
    return;
  }
  if (!req.body.email) {
    res.status(400).json({ error: " Email is empty* " });
    return;
  }
  if (!req.body.messages) {
    res.status(400).json({ error: " empty Text* " });
    return;
  }
  try {
    const messages = await new ContactFormMessagesModel({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      messages: req.body.messages.trim(),
    });
    const result = await messages.save();
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json(error);
  }
};

//!SECTION

const fetchContactFormMessages = async (req, res) => {
  try {
    const result = await ContactFormMessagesModel.find();
    res.status(400).json({ result });
  } catch (error) {
    res.status(400).json(error);
  }
};

export { insertContactFormMessages, fetchContactFormMessages };
