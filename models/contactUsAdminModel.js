import mongoose from 'mongoose';
const contactAdminSchema = new mongoose.Schema({
   
    adminPhoneNumber: {
      type: String,
      required: true
    },
    adminEmail: {
      type: String,
      required: true,
      unique: true
    },
    streetLocation: {
      type: String,
      required: true
    }
  });
  


export default mongoose.model('ContactAdmin', contactAdminSchema);