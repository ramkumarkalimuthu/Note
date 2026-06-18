const express = require('express');
require('dotenv').config(); 
//const cors = require('cors');
const authRouter = require('./routes/authRouters');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});