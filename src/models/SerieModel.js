const mongodb = require('@condor-labs/mongodb')();

const serieSchema = new mongodb.mongoose.Schema(
  {
    title: { type: String, required: true },
    urlImage: { type: String, required: true },
    seasonsNumber: { type: Number, required: false },
    category: { type: String, required: false },
    language: { type: String, required: false },
    genres: { type: Array, required: false },
    releaseDates: {
      firstDate: { type: String, required: false },
      endDay: { type: String, required: false },
    },
    country: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const serieModel = mongodb.mongoose.model('series', serieSchema); // then I am able to create a my model based on the connection object that I got using my helper

module.exports = serieModel;
