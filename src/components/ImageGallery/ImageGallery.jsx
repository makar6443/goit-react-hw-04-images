import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

import Loader from 'components/Loader';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';

import { fetchImages } from 'services/images-api.service.js';

const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { ImageGallery } = styles;
  
  useEffect(() => {
    commonResetStates();
    setSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);

    if (!search) return;

    fetchImages(search, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          return Promise.reject(
            new Error(`No photos for search query: ${search}`)
          );
        }
        const newImages = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        setImages(prevImages => [...prevImages, ...newImages]);
        setTotalHits(totalHits);
      })
      .catch(error => {
        toast.error(error.message);
        commonResetStates();
      })
      .finally(() => setLoading(false));
  }, [page, search]);

  function commonResetStates() {
    setImages([]);
    setTotalHits(0);
    setPage(1);
    setLoading(false);
  }

  const nextPageHandler = () => {
    setPage(page + 1);
  };
  
  return (
    <>
      <ul className={ImageGallery}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            />
        ))}
      </ul>
      {loading && <Loader />}
      {images.length < totalHits && (
        <Button name="loadMore" onClick={nextPageHandler} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;