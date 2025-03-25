const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const cors = require('cors');
app.use(cors());

app.use(express.json());

// database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// verify that server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// register
app.post('/register', async(req, res) => {
    try {
        console.log('Request body:', req.body); // Log incoming request
        const { username, email, password } = req.body;

        //validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // database registration
        res.status(200).json({ message: 'User successfully registered' });
    } catch (error) {
        console.error('Error during registration:', error.stack); // Log the full stack trace
        res.status(500).json({
            error: 'Internal server error.',
            message: error.message, // Provide the error message
            stack: error.stack, // Provide the stack trace to see where the error happened
        });
    }
});


// open server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});