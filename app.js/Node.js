const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like images or resumes)
app.use('/uploads', express.static('uploads'));

// Handle form submission
app.post('/submit-hiring-form', upload.single('resume'), (req, res) => {
    const { 'full-name': fullName, email, message } = req.body;
    const resume = req.file ? req.file.filename : null;

    // Process the form data (e.g., store it in a database)
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Resume:', resume);

    // Respond with success message
    res.json({ message: 'Form submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
