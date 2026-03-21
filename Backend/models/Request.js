import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  type: { type: String, required: true }, // e.g., 'App', 'Website', 'Server'
  budget: { type: String },
  status: { type: String, default: 'Unread' }, // e.g., 'Unread', 'Read', 'In Progress'
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Request', requestSchema);
