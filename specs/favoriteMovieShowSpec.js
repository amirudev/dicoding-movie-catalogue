/* eslint-disable no-new */
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import FavoriteMovieSearchView from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view';
import FavoriteMovieShowPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-show-presenter';

describe('showing all favorite movies', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('when no movies have been liked', () => {
    it('should ask for the favorite movies', () => {
      const favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);

      new FavoriteMovieShowPresenter({
        view,
        favoriteMovies,
      });

      expect(favoriteMovies.getAllMovies).toHaveBeenCalledTimes(1);
    });
  });

  describe('when favorite movies exist', () => {
    it('should show the movies', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(3);
        done();
      });

      const favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
      favoriteMovies.getAllMovies.and.returnValues([
        {
          id: 11, title: 'A', vote_average: 3, overview: 'Sebuah Film A',
        },
        {
          id: 22, title: 'B', vote_average: 4, overview: 'Sebuah Film B',
        },
        {
          id: 33, title: 'C', vote_average: 5, overview: 'Sebuah Film C',
        },
      ]);

      new FavoriteMovieShowPresenter({
        view,
        favoriteMovies,
      });
    });
  });
});
