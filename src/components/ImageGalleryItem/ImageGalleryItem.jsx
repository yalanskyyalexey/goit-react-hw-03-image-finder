import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ alt, previewURL, largeImageURL, onImageClick }) => (
  <li
    className={s.ImageGalleryItem}
    onClick={() => onImageClick(largeImageURL, alt)}
  >
    <img src={previewURL} alt={alt} className={s.ImageGalleryItem_image} />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
