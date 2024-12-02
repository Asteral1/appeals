const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPG, PNG, or MP4 files are allowed.'));
        }
    },
});

// POST route for form submission
app.post('/submit-appeal', upload.single('evidence'), (req, res) => {
    const { discordUsername, actionType, reason, apology, timestamp } = req.body;
    const evidenceFile = req.file;

    // Validate required fields
    if (!discordUsername || !actionType || !reason || !apology || !timestamp) {
        return res.status(400).json({ message: 'All fields are required except evidence.' });
    }

    // Save the appeal data (here we're just logging it for demonstration)
    const appealData = {
        discordUsername,
        actionType,
        reason,
        apology,
        timestamp,
        evidence: evidenceFile ? evidenceFile.filename : null,
    };

    console.log('New Appeal Received:', appealData);

    // Send response
    res.status(200).json({ message: 'Appeal submitted successfully!', appeal: appealData });
});

// Error handler for file upload issues
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message) {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Appeal site backend is running on http://localhost:${PORT}`);
});
