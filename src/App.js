import { Component } from 'react';
import { Notify } from 'notiflix';

import { getImages } from 'services/fetchImages';

import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Spinner } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import './App.css';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    loaderIsActive: false,
    modalIsActive: false,
    largeImage: '',
    page: 1,
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const q = searchQuery;
    const params = { q, page };

    this.setState(prevState => ({
      page: prevState.page + 1,
      loaderIsActive: true,
    }));

    getImages(params)
      .then(images => {
        if (images.length > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
        } else {
          Notify.failure("Can't find images for your querry");
        }
      })
      .catch(() => Notify.failure('Something has gone wrong'))
      .finally(() => this.setState({ loaderIsActive: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (this.state.page > 2) {
      this.scrollTo();
    }
  }

  updateQuery = query => {
    if (this.state.searchQuery === query) {
      Notify.warning('Images for your request have already been found');
      return;
    } else {
      this.setState({
        searchQuery: query,
        page: 1,
        images: [],
      });
    }
  };

  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  openModal = event => {
    const { largeImage } = event.target.attributes;

    if (event.target.nodeName === 'IMG') {
      this.setState({
        modalIsActive: true,
        largeImage: largeImage.value,
      });
    }
  };

  closeModal = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      this.setState({
        modalIsActive: false,
        largeImage: '',
      });
    }
  };

  render() {
    const { searchQuery, images, loaderIsActive, modalIsActive, largeImage } =
      this.state;
    const showButtonLoadMore = images.length > 0 && !loaderIsActive;

    return (
      <div className="App">
        <SearchForm onSubmit={this.updateQuery} />
        <ImageGallery
          images={this.state.images}
          query={this.state.searchQuery}
          onClick={this.openModal}
        />
        {loaderIsActive && <Spinner />}
        {showButtonLoadMore && <Button onClick={this.fetchImages} />}
        {modalIsActive && (
          <Modal
            largeImage={largeImage}
            alt={searchQuery}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
