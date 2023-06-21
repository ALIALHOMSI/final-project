import ContactAdmin from '../models/contactUsAdminModel.js';


  
  
export const createContactAdmin = async (req, res) => {
    try {
      console.log(req.body); 
      const { adminPhoneNumber, adminEmail,  streetLocation   } = req.body;
      if ( !adminEmail || !adminPhoneNumber || !streetLocation ) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newContactAdmin = await ContactAdmin.create({ adminPhoneNumber, adminEmail , streetLocation });
      console.log(newContactAdmin);
      res.status(201).json(newContactAdmin);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


  
  

export const getAllContactsAdmin = async (req, res) => {
  try {
    const contactsAdmin = await ContactAdmin.findOne();
    res.json(contactsAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getContactAdminById = async (req, res) => {
  try {
    const contactAdmin = await ContactAdmin.findById(req.params.contactAdminId);
    if (!contactAdmin) {
      return res.status(404).json({ error: 'ContactAdmin not found' });
    }
    res.json(contactAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


export const updateAllContactsAdmin = async (req, res) => {
    try {
      const update = req.body;
      const result = await ContactAdmin.updateMany({}, update);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  


export const deleteAllContactAdmin = async (req, res) => {
    try {
      const result = await ContactAdmin.deleteMany();
      res.json({ message: `${result.deletedCount} ContactAdmin deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  