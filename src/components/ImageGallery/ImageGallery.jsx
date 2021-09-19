import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/ImageGallery/ImageGallery.module.css';

export function ImageGallery({ images, query, onClick }) {
  return (
    <ul className={css.ImageGallery} onClick={onClick}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image.webformatURL}
          alt={query}
          largeImage={image.largeImageURL}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
