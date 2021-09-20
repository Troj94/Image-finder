import PropTypes from 'prop-types';
import { useState } from 'react';
import { Notify } from 'notiflix';
import css from 'components/SearchForm/SearchForm.module.css';

export function SearchForm({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchQuerySubmit(event) {
    event.preventDefault();

    searchQuery.trim() === ''
      ? Notify.warning('Search field is empty')
      : onSubmit(searchQuery);
    setSearchQuery('');
  }

  function handleSearchQueryChange(event) {
    setSearchQuery(event.currentTarget.value);
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSearchQuerySubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          name="query"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
