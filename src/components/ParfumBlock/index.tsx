import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cart/slice';
import { selectCartItemById } from '../../redux/slices/cart/selectors';
import { Link } from 'react-router-dom';
import { CartItem } from "../../redux/slices/cart/types";

type ParfumBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

const ParfumBlock: React.FC<ParfumBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const typesNames = ['тестер', 'оригінал'];

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {

    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: typesNames[activeType],
      count: 0,
    };
    dispatch(addItem(item));
  }

  return (
    <div className="parfum-block-wrapper">
      <div className="parfum-block">
        <Link to={`/parfum/${id}`}><img
          className="parfum-block__image"
          src={imageUrl}
          alt="Parfum"
        />
          <h4 className="parfum-block__title">{title}</h4>
        </Link>
        <div className="parfum-block__selector">
          <ul>
            {
              types.map((type, index) => <li
                key={index}
                onClick={() => setActiveType(type)}
                className={activeType === index ? "active" : ''}>
                {typesNames[type]}
              </li>)
            }


          </ul>
          <ul>
            {
              sizes.map((size, index) => (
                <li key={index} onClick={() => setActiveSize(index)} className={activeSize === index ? 'active' : ''}>{size}</li>
              ))
            }

          </ul>
        </div>
        <div className="parfum-block__bottom">
          <div className="parfum-block__price">{price} грн.</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span >Додати</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ParfumBlock;