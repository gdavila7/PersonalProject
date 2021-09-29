import Serie from '../models/SerieModel';
import axios from 'axios';

export const resolvers = {
  Query: {
    hello: () => {
      return 'Hi with graphql';
    },

    greet(root, { name }, contex) {
      console.log(contex);
      return `Saludos ${name}`;
    },

    async series() {
      return await Serie.find();
    },

    async seriesbyid(root, { id }, contex) {
      console.log(contex);
      const result = await axios(`http://localhost:7000/api/v1/series/${id}`);
      console.log(result);
      return result.data;
      //return await Serie.findById(id);
    },
  },
  Mutation: {
    async createSerie(_, { input }) {
      const newSerie = new Serie(input);
      await newSerie.save();
      return newSerie;
    },
  },
};
