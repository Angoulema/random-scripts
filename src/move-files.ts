import { resolve, basename, extname } from 'path';
import fs from 'fs';
import { move } from 'fs-extra';

const IDENTIFICATIONS = {
  MOVE_IDENTIFICATION_1: 'example1',
  MOVE_IDENTIFICATION_2: 'example2',
  MOVE_IDENTIFICATION_3: 'example3'
}

const createDirs = (rootDir: string) => {
  for (const identificator of Object.values(IDENTIFICATIONS)) {
    const path = resolve(__dirname, rootDir, identificator);
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      console.log(`Dir ${identificator} created`);
    }
  }
};

function moveFiles(rootDir: string) {
  if (!rootDir) throw new Error('No dir path');

  const relativePath = resolve(__dirname, rootDir);
  let filedRead;
  let filesUnmoved = 0;

  fs.readdir(relativePath, (err, files) => {
    if (err) {
      console.log('Error during reading dir', err);
    }
    filedRead = files.length;
    if (!filedRead) throw new Error('No files in folder');
    createDirs(rootDir);

    for (const file of files) {
      const ext = extname(file);
      const base = basename(file, ext).split('-');
      const indentPart = base[base.length - 1];

      if (Object.values(IDENTIFICATIONS).includes(indentPart) && base.length >= 2) {
        move(resolve(__dirname, rootDir, file), resolve(__dirname, rootDir, indentPart, file), (err) => {
          if (err) {
            console.log(`Error while moving file: ${file}`);
            filesUnmoved += 1;
          }
        })
      } else if (base.length >= 2) {
        console.log(`Unspecified file part: ${indentPart}`);
        filesUnmoved += 1;
      }

    };

    console.log(`Files read: ${filedRead}, files moved: ${filedRead - filesUnmoved}`)
  });
}

moveFiles('');
