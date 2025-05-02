// routes/contact.routes.js
import express from 'express';
import { createContact, deleteContactById, getAllContacts } from './contact.controller.js';
import { isAdmin } from '../../utils/middleware/auth.js';
const ContactRouter = express.Router();

ContactRouter.post('/', createContact);

ContactRouter.get('/', isAdmin, getAllContacts);

ContactRouter.delete('/:id', isAdmin, deleteContactById);

export default ContactRouter;