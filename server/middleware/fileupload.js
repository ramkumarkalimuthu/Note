const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); 
       // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
       cb(null,`${Date.now()}-${ext}`);
    }, 
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }        cb(new Error('Only images are allowed (jpeg, jpg, png)'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit

});

module.exports = upload;