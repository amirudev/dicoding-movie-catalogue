const itActsAsFavoriteMovieModel = (favoriteMovie) => {
  it('should return movie that has been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getMovie(1)).toEqual({ id: 1 });
    expect(await favoriteMovie.getMovie(2)).toEqual({ id: 2 });
    expect(await favoriteMovie.getMovie(3)).toEqual(undefined);
  });

  it('should refuse movie without correct property', async () => {
    favoriteMovie.putMovie({ aProperty: 'property' });

    expect(await favoriteMovie.getAllMovies()).toEqual([]);
  });

  it('can return all of movie that has been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getAllMovies()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should remove favorite movie from movie list', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });

    await favoriteMovie.deleteMovie(1);

    expect(await favoriteMovie.getAllMovies()).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should handle request to remove movie even movie has not been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    favoriteMovie.deleteMovie(3);

    expect(await favoriteMovie.getAllMovies()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should be able to search for a movie', async () => {
    favoriteMovie.putMovie({ id: 1, title: 'film a' });
    favoriteMovie.putMovie({ id: 2, title: 'film b' });
    favoriteMovie.putMovie({ id: 3, title: 'film ac' });
    favoriteMovie.putMovie({ id: 4, title: 'film ad' });

    expect(await favoriteMovie.searchMovies('film a')).toEqual([
      { id: 1, title: 'film a' },
      { id: 3, title: 'film ac' },
      { id: 4, title: 'film ad' },
    ]);
  });
};

export { itActsAsFavoriteMovieModel };
