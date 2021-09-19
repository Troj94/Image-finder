import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.params = {
  key: '22595056-b708caf0e2fadc435a6a49bec',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export function getImages({ q, page = 1 }) {
  return axios
    .get('https://pixabay.com/api/', { params: { q, page } })
    .then(res => res.data.hits);
}

getImages.propTypes = {
  q: PropTypes.string,
  page: PropTypes.number,
};
