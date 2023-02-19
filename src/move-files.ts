import { resolve, basename, extname } from 'path';
import fs from 'fs';
import { move } from 'fs-extra';

const IDENTIFICATIONS = ['sample1', 'sample2', 'sample3'];

const DELIMITER = '-';

const MIN_FILENAME_PARTS = 2;

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

    for (const file of files) {
      const ext = extname(file);
      const base = basename(file, ext).split(DELIMITER);
      const indentPart = base[base.length - 1];

      if (IDENTIFICATIONS.includes(indentPart) && base.length >= MIN_FILENAME_PARTS) {
        move(resolve(__dirname, rootDir, file), resolve(__dirname, rootDir, indentPart, file), (err) => {
          if (err) {
            console.log(`Error while moving file: ${file}`);
            filesUnmoved += 1;
          }
        })
      } else if (base.length >= MIN_FILENAME_PARTS) {
        console.log(`Unspecified file part: ${indentPart}`);
        filesUnmoved += 1;
      }

    };

    console.log(`Files read: ${filedRead}, files moved: ${filedRead - filesUnmoved}`)
  });
}

moveFiles('');
