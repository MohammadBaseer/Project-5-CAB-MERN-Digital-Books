import express from "express";
import { fetchContactFormMessages, insertContactFormMessages } from "../controller/ContactFormMessagesController.js";

const ContactFormMessagesRouter = express.Router();

ContactFormMessagesRouter.post("/messages", insertContactFormMessages);
ContactFormMessagesRouter.get("/messages", fetchContactFormMessages);

export default ContactFormMessagesRouter;
