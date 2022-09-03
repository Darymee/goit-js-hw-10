import './css/styles.css';
import { fetchContries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input#search-box'),
  list: document.querySelector('.country-list'),
  wrap: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  let textOnInput = evt.target.value.toLowerCase().trim();
  clearMarkup();
  clearCountryList();
  if (!textOnInput) {
    clearMarkup();
    clearCountryList();
    Notify.warning('You should write the name of the country');
    return;
  }

  fetchContries(textOnInput)
    .then(countries => {
      onInputControl(countries);
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function createCountryList(array) {
  refs.list.innerHTML = array
    .map(
      ({ flags, name }) =>
        `<li class="country-item"><img src="${flags.svg}" alt="${name.official}" width="60" height="35" class="country-img"><p class="country-name">${name.official}</p></li>`
    )
    .join('');
}

function createMarkup(countries) {
  refs.wrap.innerHTML = countries
    .map(
      ({
        flags,
        name,
        capital,
        population,
        languages,
      }) => `<article class="card">
    <img src="${flags.svg}" alt="${
        name.official
      }" class="card-image" width="200" height="130"><h2 class="card-title">${
        name.official
      }</h2><ul class="card-list">
<li class="card-text"><span class="card-info">Capital:</span>${capital}</li>
<li class="card-text"><span class="card-info">Population:</span>${population}</li>
<li class="card-text"><span class="card-info">Language:</span>${Object.values(
        languages
      ).join(',  ')}</li></ul>
      </article>`
    )
    .join('');
}

function clearCountryList() {
  refs.list.innerHTML = '';
}

function clearMarkup() {
  refs.wrap.innerHTML = '';
}

function onInputControl(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    clearMarkup();
    clearCountryList();
  } else if (countries.length > 1 && countries.length <= 10) {
    createCountryList(countries);
    clearMarkup();

    Notify.info('Please write the name of the country more accurate');
  } else if (countries.length === 1) {
    createMarkup(countries);
    clearCountryList();
    Notify.success('We found your country!');
  }
}
