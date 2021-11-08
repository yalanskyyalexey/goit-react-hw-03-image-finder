import axios from 'axios';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=20663729-402ac0755ef01966534e76e9d&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
    )
    .then(response => response.data.hits)
    .catch(error => console.log('error: ', error));
};

export default fetchImages;

// const API_KEY = '7055575-04a3ba49e3c82fdd87935eab9';
// const BASE_URL = 'https://pixabay.com/api/';

// axios.defaults.baseURL = BASE_URL;
// axios.defaults.params = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
// };
