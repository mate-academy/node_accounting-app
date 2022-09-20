'use strict';

const { resolve } = require('path');
const { existsSync, createWriteStream, readFileSync } = require('fs');
const { gunzipSync, createGzip } = require('zlib');
const { Readable } = require('stream');

const filePath = fileName => resolve('storage', fileName + '.gz');

const getDataFromStorage = (fileName) => {
  if (!existsSync(filePath(fileName))) {
    return [];
  }

  const fileContent = readFileSync(filePath(fileName));
  const data = gunzipSync(fileContent);

  return JSON.parse(data);
};

const saveDataToStorage = (fileName, data) => {
  Readable
    .from(JSON.stringify(data))
    .pipe(createGzip())
    .pipe(createWriteStream(filePath(fileName)));
};

module.exports = {
  getDataFromStorage,
  saveDataToStorage,
};
