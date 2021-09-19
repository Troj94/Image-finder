import PropTypes from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export function ImageGalleryItem({ image, alt, largeImage }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={image}
        alt={alt}
        largeimage={largeImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
