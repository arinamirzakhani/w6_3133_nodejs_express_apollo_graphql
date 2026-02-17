import MovieModel from '../models/movie.js';

const resolvers = {
  Query: {
    getAllMovies: async () => {
      return await MovieModel.find();
    },

    getMovieById: async (_, { id }) => {
      return await MovieModel.findById(id);
    },

    getMoviesByDirector: async (_, { director_name }) => {
      return await MovieModel.findByDirector(director_name); // STATIC method ✅
    },
  },

  Mutation: {
    addMovie: async (_, { input }) => {
      const movie = new MovieModel(input);
      return await movie.save();
    },

    updateMovie: async (_, { id, input }) => {
      return await MovieModel.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
    },

    deleteMovieById: async (_, { id }) => {
      const deleted = await MovieModel.findByIdAndDelete(id);
      return deleted ? true : false;
    },
  },
};

export default resolvers;
