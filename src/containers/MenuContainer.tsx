import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckbox } from '../reducers/services';
import { addToCart, removeFromCart } from '../reducers/cart';
import { RootState } from '../reducers';
import Menu from '../components/Menu';

interface MenuContainerProps {
  menu: {
    name: string;
    price: number;
    id: string;
    checked: boolean;
  };
}

export default function MenuContainer({ menu }: MenuContainerProps) {
  const { serviceById } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch();

  const onClickCheckbox = (id: string, checked: boolean) => {
    if (!checked) {
      dispatch(addToCart(serviceById[id]));
    } else {
      dispatch(removeFromCart(id));
    }

    dispatch(toggleCheckbox(id));
  };

  return (
    <Menu
      name={menu.name}
      price={menu.price}
      id={menu.id}
      checked={menu.checked}
      onClickCheckbox={onClickCheckbox}
    />
  );
}
