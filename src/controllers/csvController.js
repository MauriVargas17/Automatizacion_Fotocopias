const dotenv = require('dotenv');
const pathMaker = require('path');
const catchAsync = require('../utils/catchAsync');
const Request = require('../models/requestModel');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

dotenv.config({ path: './config.env' });

const url = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

const mongoClient = new MongoClient(url);

const writeToArray = async function (query) {
  const items = [];
  for await (const item of query) {
    items.push({
      id: item._id,
      user: item.user,
      faculty: item.faculty,
      numberOfCopies: item.numberOfCopies,
      numberOfPages: item.numberOfPages,
      paperSheets: item.paperSheets,
      date: item.pickUpDate,
      coloured: item.isColoured,
      ringed: item.isRinged,
    });
  }
  return items;
};

exports.downloadAsCSV = catchAsync(async (req, res, next) => {
  await mongoClient.connect();
  const fileName = `${
    new Date().toISOString().split('T')[0]
  }-Reporte-Fotocopias.csv`;

  const folder = 'downloads';
  const folderPath = pathMaker.join(__dirname, folder);
  const completePath = pathMaker.join(__dirname, folder, fileName);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    files.forEach((file) => {
      fs.unlink(pathMaker.join(folderPath, file), (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });

    console.log('All files have been deleted successfully!');
  });

  const requests = await Request.find({ requestIsCompleted: true });
  const csvWriter = createCsvWriter({
    path: completePath,
    header: [
      { id: 'id', title: 'ID DE SOLICITUD' },
      { id: 'user', title: 'USUARIO' },
      { id: 'faculty', title: 'FACULTAD' },
      { id: 'numberOfCopies', title: 'NUMERO DE COPIAS' },
      { id: 'numberOfPages', title: 'CANTIDAD DE PAGINAS' },
      { id: 'paperSheets', title: 'TOTAL HOJAS' },
      { id: 'date', title: 'FECHA' },
      { id: 'coloured', title: 'A COLORES' },
      { id: 'ringed', title: 'ANILLADO' },
    ],
  });

  const arrayOfRequests = await writeToArray(requests);
  csvWriter.writeRecords(arrayOfRequests).then(() => {
    console.log('Done !');
    const fileLength = fs.statSync(completePath).size;
    res.set('Content-Type', 'text/csv');
    res.set('Content-Length', fileLength);

    res.download(pathMaker.resolve(completePath));
  });

  console.log('Path to file: ', completePath);
});
