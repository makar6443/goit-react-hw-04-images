import axios from 'axios';

const API = 'https://pixabay.com/api/';
const KEY = '31581493-316fbeb9be1137e5ea19fed9b';
const TYPE = 'photo';
const ORIENTATION = 'horizontal';
const PER_PAGE = 12;

export async function fetchImages(searchQuery, page = 1) {
  const params = {
    q: searchQuery,
    page,
    key: KEY,
    image_type: TYPE,
    orientation: ORIENTATION,
    per_page: PER_PAGE,
  };
  const searchAPI = API + '?' + new URLSearchParams(params);

  try {
    const response = await axios.get(searchAPI);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}