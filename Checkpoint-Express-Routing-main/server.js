const express = require('express');
const path = require('path'); // For serving static files (CSS)

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Middleware to check working hours (replace with your desired logic)
const isWorkingHours = (req, res, next) => {
  const today = new Date();
  const day = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = today.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    // Working hours
    next();
  } else {
    // Not working hours
    res.status(410).send('Website unavailable outside working hours (Mon-Fri 9AM-5PM)');
  }
};

// Apply middleware to all routes
app.use(isWorkingHours);

// Serve static files from 'public' directory (create it)
app.use(express.static(path.join(__dirname, 'public')));

// Routes for each page (replace with your desired content)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Home page
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html')); // Our Services
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html')); // Contact Us
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
