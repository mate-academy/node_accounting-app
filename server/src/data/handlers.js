import fs from 'fs';

export function readFileSync(filePath) {
  return fs.readFileSync(filePath);
}

export function writeFile(filePath, data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      throw new Error('Could not write to file');
    }
  });
}
