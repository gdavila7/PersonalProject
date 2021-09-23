import Serie from '../models/SerieModel';

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
  },
  Mutation: {
    async createSerie(_, { input }) {
      const newSerie = new Serie(input);
      await newSerie.save();
      return newSerie;
    },
  },
};
