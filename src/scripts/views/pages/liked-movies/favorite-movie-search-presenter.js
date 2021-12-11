class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies, view }) {
    this._view = view;
    this._listenToSearchUserByQuery();
    this._favoriteMovies = favoriteMovies;
  }

  _listenToSearchUserByQuery() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchMovies(latestQuery);
    });
  }

  get latestQuery() {
    return this._latestQuery;
  }

  async _searchMovies(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundMovies;
    if (this.latestQuery.length > 0) {
      foundMovies = await this._favoriteMovies.searchMovies(this.latestQuery);
    } else {
      foundMovies = await this._favoriteMovies.getAllMovies();
    }
    // const foundMovies = await this._favoriteMovies.searchMovies(this._latestQuery);

    console.log(`foundMovies: ${foundMovies}`);
    this._showFoundMovies(foundMovies);
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundMovies(movies) {
    console.log(`favoriteMovieSearchPresenter showFoundMovies ${movies}`);
    this._view.showFavoriteMovies(movies);
  }
}

export default FavoriteMovieSearchPresenter;
