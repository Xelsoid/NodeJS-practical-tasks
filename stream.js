import fs from "fs";
import csv from "csvtojson";

const csvFilePath = 'books.csv';

try {
  const jsonArr = await csv().fromFile(csvFilePath);
  const writeStream =  fs.createWriteStream('./books.txt', 'utf8');

  jsonArr.forEach((elem) => {
    writeStream.write(`${JSON.stringify(elem)}\n`);
  });

  writeStream.on("error", (error) => {
    console.log(error);
  })
} catch(e) {
  console.log(e.message);
}
