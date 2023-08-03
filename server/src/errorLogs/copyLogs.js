const fs = require('fs');
const path = require('path');

const sourceFilePath = path.join(__dirname, 'error.txt'); 
const destinationFolderPath = path.join(__dirname, 'dailyErrors');

module.exports.transformAndCopyFile = () => {
  const timestamp = new Date().getTime(); 

  const destinationFileName = `${timestamp}.txt`; 
  const destinationFilePath = path.join(
    destinationFolderPath,
    destinationFileName
  );

  fs.readFile(sourceFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the source file:', err);
      return;
    }
    const transformedDataArray = JSON.parse(data).map(obj => {
      delete obj.stackTrace;
      return obj;
    });

    const transformedContent = JSON.stringify(transformedDataArray, null, 2);

    fs.writeFile(destinationFilePath, transformedContent, err => {
      if (err) {
        console.error('Error writing to the destination file:', err);
        return;
      }

      console.log('File copied and transformed successfully.');

      fs.writeFile(sourceFilePath, '', err => {
        if (err) {
          console.error('Error clearing the source file:', err);
        } else {
          console.log('Source file cleared, ready for new errors.');
        }
      });
    });
  });
};
