const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const date = new Date();

const fileStorageEngine = new GridFsStorage({
  url: `mongodb+srv://mauri123:${process.env.DATABASE_PASSWORD}@fotocopiadora.av5aph8.mongodb.net/?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['application/pdf'];

    if (match.includes(file.mimetype)) {
      const filename = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}--${file.originalname}`;

      return filename;
    }
  },
});

const uploadFiles = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only pdfs are allowed'));
    }
    cb(null, true);
  },
}).single('file');
const filesMiddleware = util.promisify(uploadFiles);
module.exports = filesMiddleware;
