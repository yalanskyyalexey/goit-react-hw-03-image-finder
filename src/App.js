import { Component } from 'react';
import LoaderSpinner from './components/Loader/Loader';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchImages from './apiService/images-api';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import s from './App.module.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    pageSize: 12,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(prevProps, PrevState) {
    if (PrevState.searchQuery !== this.state.searchQuery) {
      this.getImagesFromApi();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));

    if (this.state.showModal) {
      this.setState({ largeImgUrl: '', alt: '' });
    }
  };

  handleModal = (largeImgUrl, alt) => {
    this.setState({ largeImgUrl: largeImgUrl, alt: alt });
    this.toggleModal();
  };

  getImagesFromApi = () => {
    const { searchQuery, currentPage, pageSize } = this.state;
    const options = { searchQuery, currentPage, pageSize };
    this.setState({ isLoading: true });

    fetchImages(options)
      // .fetchImages(options)
      .then(images => {
        if (images.length === 0) {
          this.setState({
            error: `Error`,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            currentPage: prevState.currentPage + 1,
          }));
        }
      })
      .catch(error => this.setState({ error: error }))
      .finally(() =>
        this.setState(
          { isLoading: false },
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          }),
        ),
      );
  };

  render() {
    const { images, isLoading, error, showModal, largeImgUrl, alt } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <h3 className={s.Error}>Search error: Please try again!</h3>}
        <ImageGallery images={images} onImageClick={this.handleModal} />
        {isLoading && <LoaderSpinner className={s.Loader} />}
        {(images.length && !isLoading) > 0 && (
          <Button onClick={this.getImagesFromApi} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImgUrl} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
