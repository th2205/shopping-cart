import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import {
  changeQuantity,
  removeDiscount,
  removeService,
  calculatePrice,
  applyDiscount,
  ServiceData,
  DiscountData
} from '../reducers/cart';
import {
  toggleServiceCheckbox,
  toggleDiscountCheckbox
} from '../reducers/services';
import Cart from '../components/Cart';

export default function CartContainer() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { serviceCart, discountCart } = useSelector(
    (state: RootState) => state.cart
  );
  const { serviceById } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch();
  console.log(serviceById);
  const onChangeQuantity = (id: string, quantity: number) => {
    dispatch(changeQuantity(id, quantity));
    dispatch(calculatePrice(serviceById));
  };

  const removeCartService = (id: string) => {
    dispatch(removeService(id));
    dispatch(toggleServiceCheckbox(id));
    dispatch(calculatePrice(serviceById));
  };

  const removeCartDiscount = (id: string) => {
    dispatch(removeDiscount(id));
    dispatch(toggleDiscountCheckbox(id));
    dispatch(calculatePrice(serviceById));
  };

  const applyDiscountToCart = (serviceId: string, discountId: string) => {
    dispatch(applyDiscount(serviceId, discountId));
    dispatch(calculatePrice(serviceById));
  };

  useEffect(() => {
    dispatch(calculatePrice(serviceById));
  }, [dispatch, serviceById]);

  useEffect(() => {
    setTotalPrice(0);
    if (serviceCart.length) {
      const totalPrice = serviceCart.reduce((acc: number, cur: ServiceData) => {
        const quantity = cur.count;
        const price = cur.price;

        return acc + quantity * price;
      }, 0);

      const totalDiscount = discountCart.reduce(
        (acc: number, cur: DiscountData) => {
          return acc + cur.totalDiscount;
        },
        0
      );

      setTotalPrice(totalPrice - totalDiscount);
    }
  }, [serviceCart, discountCart]);

  return (
    <Cart
      serviceCart={serviceCart}
      discountCart={discountCart}
      totalPrice={totalPrice}
      serviceById={serviceById}
      onChangeQuantity={onChangeQuantity}
      removeCartService={removeCartService}
      removeCartDiscount={removeCartDiscount}
      applyDiscountToCart={applyDiscountToCart}
    />
  );
}
