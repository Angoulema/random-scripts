### Random scripts for personal use

## Move files script

Used when there's need to sort files info folders depending on the last part of the file name.

`IDENTIFICATIONS` -  an array with last file parts used for identification AND creating folders.

Function `moveFiles` takes a path to the directory with files as a `string`, checks files inside and moves them to new folders according to the latest part of the file name. Parts of file names are detected according to `DELIMITER` string.
