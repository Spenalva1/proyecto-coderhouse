import multer from 'multer';

// configuro multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/profile_photos');
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}.${file.originalname.split('.')[1]}`);
  },
});

export default multer({ storage: storage });
