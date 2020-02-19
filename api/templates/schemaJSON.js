const { capitalize } = require('../utilities');

module.exports = {
  getTemplate: (data) => {
    const name = data.name;
    const uppercaseName = capitalize(data.name);

    return `
      // Default Imports
      const ${name}Config = require('../config/shema');
      const privateMethods = require('../methods/privateMethods.js');
      const mongoose = require('mongoose');
      const Schema = mongoose.Schema;

      // Create Schema
      const ${name}Schema = new Schema(${name}Config.schema);

      // Instance Methods

      // Static Methods

      // Path Methods


      // Pre Methods
      ${name}Schema.pre('save', function(next) {
        this.updated_at = new Date();
        next();
      });

      // Export model
      const ${uppercaseName} = mongoose.model('${uppercaseName}', ${name}Schema);
      // Fix indexing issues
      ${uppercaseName}.createIndexes();
      module.exports = ${uppercaseName};

    `;
  }
};
