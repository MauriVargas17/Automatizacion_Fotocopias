const fileMware = require('../middlewares/fileMiddleware');
const dotenv = require('../config.env');

const MongoClient = require('mongodb').MongoClient;
const GridFSBucket = require('mongodb').GridFSBucket;

const url = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

const baseUrl = 'http://localhost:3000/pdfs/';

const mongoClient = new MongoClient(url);

exports.uploadFiles = async (req, res) => {
  try {
    await fileMware(req, res);
    console.log(req.file);

    if (req.file == undefined) {
      return res.send({
        message: 'You must select a file.',
      });
    }

    return res.send({
      message: 'File has been uploaded.',
    });
  } catch (error) {
    console.log(error);

    return res.send({
      message: `Error when trying upload image: ${error}`,
    });
  }
};

exports.getListOfFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db('');
    const files = database.collection(process.env.FILESBUCKET + '.files');

    const cursor = files.find({});

    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: 'No files found!',
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

exports.downloadByName = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db('');
    const bucket = new GridFSBucket(database, {
      bucketName: process.env.FILESBUCKET,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on('data', function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on('error', function (err) {
      return res.status(404).send({ message: 'Cannot download the File!' });
    });

    downloadStream.on('end', () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

exports.deleteByName = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db('');
    const bucket = new GridFSBucket(database, {
      bucketName: process.env.FILESBUCKET,
    });

    const file = await bucket.find({ filename: req.params.name }).next();

    if (!file) {
      return res.status(404).send({ message: 'File not found!' });
    }

    await bucket.delete(file._id);

    res.status(200).send({ message: 'File deleted!' });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
