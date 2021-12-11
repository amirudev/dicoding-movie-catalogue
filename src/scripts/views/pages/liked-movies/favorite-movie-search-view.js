import { createMovieItemTemplate } from '../../templates/template-creator';

/* eslint-disable class-methods-use-this */
class FavoriteMovieSearchView {
  getTemplate() {
    return `
    <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your liked movie</h2>
        <div id="movie-search-container">
            <div id="movies" class="movies"></div>
            </div>
        </div>
    </div>`;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showMovies(movies) {
    this.showFavoriteMovies(movies);
  }

  showFavoriteMovies(movies = []) {
    let html;
    console.log(`showFavoriteMovies: ${movies}`);

    if (movies.length) {
      console.log('Sure, you have movie to list');
      html = movies.reduce((carry, movie) => carry.concat(createMovieItemTemplate(movie)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }

    document.getElementById('movies').innerHTML = html;
    document.getElementById('movies').dispatchEvent(new Event('movies:updated'));
  }

  _getEmptyMovieTemplate() {
    return '<div class="movie-item__not__found movies__not__found">Tidak ada film untuk ditampilkan</div>';
  }
}

export default FavoriteMovieSearchView;
