const mongodb = require('@condor-labs/mongodb')();

const serieSchema = new mongodb.mongoose.Schema({
  name: String,
  country: String,
});

const serieModel = mongodb.mongoose.model('series', serieSchema); // then I am able to create a my model based on the connection object that I got using my helper

module.exports = serieModel;
