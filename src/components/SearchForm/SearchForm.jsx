import PropTypes from 'prop-types';
import { Component } from 'react';
import { Notify } from 'notiflix';
import css from 'components/SearchForm/SearchForm.module.css';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQuerySubmit = event => {
    event.preventDefault();

    this.state.searchQuery.trim() === ''
      ? Notify.warning('Search field is empty')
      : this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          onSubmit={this.handleSearchQuerySubmit}
        >
          <button className={css.SearchFormButton} type="submit">
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            name="query"
            value={this.state.searchQuery}
            onChange={this.handleSearchQueryChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
