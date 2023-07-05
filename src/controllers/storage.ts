'use strict';
import { resolve } from 'path';
import { existsSync, readFileSync, createWriteStream } from 'fs';
import { gunzipSync, createGzip } from 'zlib';
import { Readable } from 'stream';

const filePath = (fileName: string) => resolve('storage', fileName + '.gz');

const getDataFromStorage = <T>(fileName: string): T[] => {
  if (!existsSync(filePath(fileName))) {
    return [];
  }

  const fileContent = readFileSync(filePath(fileName));
  const data = gunzipSync(fileContent);

  return JSON.parse(data.toString());
}

const saveDataToStorage = (fileName: string, data: object) => {
  Readable
    .from(JSON.stringify(data))
    .pipe(createGzip())
    .pipe(createWriteStream(filePath(fileName)));
}

export default {
  getDataFromStorage,
  saveDataToStorage,
};
