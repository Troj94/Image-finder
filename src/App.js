import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';

import { getImages } from 'services/fetchImages';

import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Spinner } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loaderIsActive, setLoaderIsActive] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    function fetchImages() {
      const q = searchQuery;

      if (q.trim() === '') {
        return;
      }

      setLoaderIsActive(true);

      getImages({ q, page })
        .then(images => {
          if (images.length > 0) {
            setImages(prevImages => [...prevImages, ...images]);
            scrollTo();
          }
        })
        .catch(() => Notify.failure("Can't find images for your query"))
        .finally(() => setLoaderIsActive(false));
    }

    fetchImages();
  }, [searchQuery, page]);

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  function updateQuery(query) {
    if (searchQuery === query) {
      Notify.warning('Images for your request have already been found');
      return;
    } else {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
    }
  }

  function scrollTo() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  function openModal(event) {
    const { largeImage } = event.target.attributes;

    if (event.target.nodeName === 'IMG') {
      setModalIsActive(true);
      setLargeImage(largeImage.value);
    }
  }

  function closeModal(event) {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      setModalIsActive(false);
      setLargeImage('');
    }
  }

  const showButtonLoadMore = images.length > 0 && !loaderIsActive;

  return (
    <div className="App">
      <SearchForm onSubmit={updateQuery} />
      <ImageGallery images={images} query={searchQuery} onClick={openModal} />
      {loaderIsActive && <Spinner />}
      {showButtonLoadMore && <Button onClick={nextPage} />}
      {modalIsActive && (
        <Modal largeImage={largeImage} alt={searchQuery} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
