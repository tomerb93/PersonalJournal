const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');
const app = express();
const path = require('path');

connectDatabase();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/entries', require('./routes/api/entries'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
