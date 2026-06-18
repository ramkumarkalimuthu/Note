const db = require('../db');
const bcrypt = require('bcryptjs');
const register = async (req, res) => {  
    try {
        const { username, email, contact, password } = req.body;
        const profile_image = req.file ? `/uploads/${req.file.filename}` : null; // Store filename if image is uploaded, otherwise null
        // Validate input
        if (!username || !email || !contact || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ? or email = ?', [username, email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        //hash the password before storing it in the database

        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in the database

        const sql = 'INSERT INTO users (username, email, contact, password, profile_image) VALUES (?, ?, ?, ?, ?)';

        const [result] = await db.query(sql, [username, email, contact||null, hashedPassword, profile_image]);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
    };

    const login = async (req, res) => {};

    module.exports = {register, login};