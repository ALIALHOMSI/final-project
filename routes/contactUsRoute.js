import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById
} from '../controller/contactUsController.js';

const contactRoute = express.Router();

contactRoute.post('/create', createContact);
contactRoute.get('/getAll', getAllContacts);
contactRoute.get('/:id',getContactById);
contactRoute.put('/update/:contactId', updateContactById);
contactRoute.delete('/delete/:contactId', deleteContactById);

export default contactRoute;