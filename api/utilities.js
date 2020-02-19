const fs = require('fs-extra');

module.exports = {
  getDirectories: (source) =>
    fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name),

  getExcluded: (JSON) => {
    const excludedValues = {};
    Object.entries(JSON).forEach(([key, val]) => {
      if (!val.show) {
        excludedValues[key] = 0;
      }
    });
    return excludedValues;
  },

  getEditable: (JSON) => {
    const editable = [];
    Object.entries(JSON).forEach(([key, val]) => {
      if (val.canEdit) {
        editable.push(key);
      }
    });
    return editable;
  },

  capitalize: (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  writeToFile: (filename, content) => {
    return new Promise((resolve, reject) => {
      fs.outputFile(filename, content, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('File Was Saved!');
        }
      });
    });
  }
};
