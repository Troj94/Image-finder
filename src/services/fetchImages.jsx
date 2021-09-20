import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '22595056-b708caf0e2fadc435a6a49bec';

export function getImages({ q, page = 1 }) {
  const API = `${API_URL}?q=${q}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(API).then(res => res.data.hits);
}

getImages.propTypes = {
  q: PropTypes.string,
  page: PropTypes.number,
};
