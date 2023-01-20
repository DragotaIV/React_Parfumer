import React from 'react';
import cartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Кошик пустий <span>😕</span></h2>
        <p>
          Ви мабуть нічого не замовили
          <br />
          Для того, щоб замовити товар перейдіть на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутися</span>
        </Link>
      </div></>
  )
}

export default CartEmpty;