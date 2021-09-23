import Series from '../models/SerieModel';
//const logger = require('@condor-labs/logger');

export const getSeries = async (req, res) => {
  const series = await Series.find();
  res.json(series);
};

export const createSerie = async (req, res) => {
  const { title, urlImage, seasonsNumber, category, language, genres, releaseDates, country } = req.body;

  const newSerie = new Series({
    title: title,
    urlImage: urlImage,
    seasonsNumber: seasonsNumber,
    category: category,
    language: language,
    genres: genres,
    releaseDates: releaseDates,
    country: country,
  });

  const serieSaved = await newSerie.save();
  res.status(201).json(serieSaved);
};
