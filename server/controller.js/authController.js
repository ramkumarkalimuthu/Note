const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Register a new user
const register = async (req, res) => {  
    try {
        const { username, email, contact, password } = req.body;

        console.log('Body:', req.body);
       
        const profile_image = req.file ? `/uploads/${req.file.filename}` : null;
        
        if (!username || !email || !contact || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ? or email = ?', [username, email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, email, contact, password, profile_image) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(sql, [username, email, contact || null, hashedPassword, profile_image]);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Login a user
   const login = async (req, res) => {
    try {     
        

        const { username, password } = req.body;       
        
        const [users] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, username]);
        //console.log('Users:', users[0]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const user = users[0];
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // If login is successful, you can generate a token or session here (not implemented in this example)

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.cookie('token', token, { 
            httpOnly: true, 
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000) // Convert days to milliseconds 
        }); 


        res.status(200).json({ message: 'Login successful', userId: user.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }


   };
// Get current user
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.userId;// Assuming the user ID is stored in the token payload  
          
        
        const [users] = await db.query('SELECT id, username, email, contact, profile_image FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: users[0] });
    }

    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }


};
// Upload profile image
const uploadProfileImage = async (req, res) => {

    try {
        const userId = req.user.userId;
        const profile_image = req.file ? `/uploads/${req.file.filename}` : null;
await db.query('UPDATE users SET profile_image = ? WHERE id = ?', [profile_image, userId]);
        res.status(200).json({ message: 'Profile image uploaded successfully', profile_image });        
    }
        catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
};


    module.exports = {register, login, getCurrentUser, uploadProfileImage};