import { itActsAsFavoriteMovieModel } from './contract/favoriteMovieContract';

let favoriteMovies = [];

const FavoriteMovieArray = {
  getMovie(id) {
    if (!id) {
      return;
    }

    return favoriteMovies.find((movies) => movies.id === id);
  },

  getAllMovies() {
    return favoriteMovies;
  },

  putMovie(movie) {
    if (!movie.hasOwnProperty('id')) {
      return;
    }

    if (this.getMovie(movie.id)) {
      return;
    }

    favoriteMovies.push(movie);
  },

  deleteMovie(id) {
    favoriteMovies.filter((movie) => movie.id !== id);
  },

  searchMovies(query) {
    return this.getAllMovies().filter((movie) => {
      const loweredCaseMovieTitle = (movie.title || '-').toLowerCase();
      const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedMovieTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

xdescribe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteMovies = [];
  });

  itActsAsFavoriteMovieModel(FavoriteMovieArray);
});
