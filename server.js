const express = require('express');
const connectDatabase = require('./config/db');
const app = express();

connectDatabase();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/entries', require('./routes/api/entries'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
