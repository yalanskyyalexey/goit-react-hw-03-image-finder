import Loader from 'react-loader-spinner';
import s from './Loader.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderSpinner = () => {
  return (
    <Loader
      className={s.Loader}
      type="Audio"
      color="#D9DB57"
      height={100}
      width={100}
      timeout={1000}
    />
  );
};

export default LoaderSpinner;
