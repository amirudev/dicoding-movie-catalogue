import FavoriteMovieSearchView from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';

describe('Searching movies', () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const constructPresenter = () => {
    // favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb, 'searchMovies');
    favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
    presenter = new FavoriteMovieSearchPresenter({
      favoriteMovies,
      view,
    });
  };

  const setMovieSearchContainer = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  describe('when query is not empty', () => {
    it('should be able to capture the query typed by user', () => {
      searchMovies('film a');

      expect(presenter.latestQuery).toEqual('film a');
    });

    it('should ask the model to search for liked movies', () => {
      searchMovies('film a');

      expect(FavoriteMovieIdb.searchMovies).toHaveBeenCalledWith('film a');
    });

    it('should show the found movie', () => {
      presenter._showFoundMovies([{ id: 1, title: 'Film Satu' }]);
      expect(document.querySelectorAll('.movie-item').length).toEqual(1);

      presenter._showFoundMovies([{ id: 1, title: 'Film Satu' }, { id: 2, title: 'Film Dua' }]);
      expect(document.querySelectorAll('.movie-item').length).toEqual(2);
    });

    it('should show the title of founded movie', () => {
      presenter._showFoundMovies([{ id: 1, title: 'Film satu' }]);
      console.log(`title of founded movie: ${document.querySelectorAll('.movie__title').item(0)}`);
      expect(document.querySelectorAll('.movie__title').item(0).textContent).toEqual('Film satu');
    });

    it('should show the movies found by Favorite movies', (done) => {
      document.getElementById('movies')
        .addEventListener('movies:updated', () => {
          console.log(`.movie in html: ${document.querySelectorAll('.movie').length}`);
          expect(document.querySelectorAll('.movie-item').length).toEqual(3);
          done();
        });

      favoriteMovies.searchMovies.withArgs('Film a').and.returnValues([
        {
          id: 111,
          title: 'Film a',
        },
        {
          id: 222,
          title: 'Film b',
        },
        {
          id: 333,
          title: 'Film c',
        },
      ]);

      searchMovies('Film a');
    });

    it('should show the name of movie found by Favorite movie', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent).toEqual('film abc');
        expect(movieTitles.item(1).textContent).toEqual('film def');
        expect(movieTitles.item(2).textContent).toEqual('film ghi');

        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
        { id: 111, title: 'film abc' },
        { id: 222, title: 'film def' },
        { id: 333, title: 'film ghi' },
      ]);

      searchMovies('film a');
    });

    it('should show the empty message', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);
        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);

      searchMovies('film a');
    });

    it('should not show any movie', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(0);
        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);

      searchMovies('film a');
    });
  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      searchMovies(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('  ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite movies', () => {
      searchMovies('   ');

      expect(favoriteMovies.getAllMovies).toHaveBeenCalledTimes(1);
    });

    it('should show the empty messages', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);

        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);
      searchMovies('film a');
    });
  });
});
