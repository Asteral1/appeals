const express = require('express');
const app = express();
const PORT = 3000;

// Route for the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple POST route
app.post('/data', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', data });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
