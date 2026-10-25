const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/enquiries', require('./routes/enquiries'));
// app.use('/api/projects', require('./routes/projects'));
// app.use('/api/services', require('./routes/services'));
// app.use('/api/gallery', require('./routes/gallery'));
// app.use('/api/before-after', require('./routes/beforeAfter'));
// app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/settings', require('./routes/settings'));

app.get('/', (req, res) => {
  res.send('Shiv Shakti Construction API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/enquiries`);
});
