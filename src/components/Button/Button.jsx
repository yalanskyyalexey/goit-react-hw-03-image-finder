import s from './Button.module.css';

const Button = ({ onClick }) => (
  <div className={s.btnWrapper}>
    <button type="button" className={s.Button} onClick={onClick}>
      Load More
    </button>
  </div>
);

export default Button;
