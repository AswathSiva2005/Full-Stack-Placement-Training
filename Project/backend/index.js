import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Missing MONGODB_URI in environment');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
});

app.get('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: 'Invalid id' });
  }
});

app.post('/tickets', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ticket) return res.status(404).json({ message: 'Not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid id' });
  }
});

mongoose
  .connect(mongoUri, { dbName: 'event_ticket' })
  .then(() => {
    app.listen(port, () => {
      console.log(`API ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to Mongo:', err.message);
    process.exit(1);
  });


