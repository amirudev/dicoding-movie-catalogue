/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking movies');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked movies', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one movie', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  const firstFilm = locate('.movie__title a').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);

  I.seeElement('.movie__title a');
  I.click(locate('.movie__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.movie-item');

  const firstLikedFilm = locate('.movie__title a').first();
  const firstLikedFilmTitle = await I.grabTextFrom(firstLikedFilm);

  assert.strictEqual(firstFilmTitle, firstLikedFilmTitle);
});

Scenario('searching movie', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.movie__title a');

  const titles = [];

  for (let i = 1; i <= 4; i += 1) {
    I.click(locate('.movie__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.movie__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingMovies = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedMovies = await I.grabNumberOfVisibleElements('.movie-item');
  assert.strictEqual(matchingMovies.length, visibleLikedMovies);

  matchingMovies.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.movie__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
