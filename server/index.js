const express = require('express');
const cookiesParser = require('cookie-parser');
require('dotenv').config(); 
const cors = require('cors');
const authRouter = require('./routes/authRouters');
const noteRouter = require('./routes/noteRouters');
const path = require('path');
const app = express();
app.use(cookiesParser());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use("/noteimage", express.static(path.join(__dirname, 'noteimage')));
app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});