import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking a movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when like button has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
  });

  it('should show the unlike button when like button has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
  });

  it('like button functionality', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const movie = await FavoriteMovieIdb.getMovie(1);

    expect(movie).toEqual({ id: 1 });

    FavoriteMovieIdb.deleteMovie(1);
  });

  it('should not add a movie again when its liked', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    await FavoriteMovieIdb.putMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

    FavoriteMovieIdb.deleteMovie(1);
  });

  it('should not add a movie when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
