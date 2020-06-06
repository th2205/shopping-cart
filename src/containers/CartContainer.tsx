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
import { getExchangeRate } from '../utils/api';
import Cart from '../components/Cart';

export default function CartContainer() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { serviceCart, discountCart } = useSelector(
    (state: RootState) => state.cart
  );
  const { serviceById, currencyCode } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch();

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
    if (serviceCart.length) {
      const getTotalPrice = async () => {
        const exchangeRate: number = await getExchangeRate();
        const totalPrice = serviceCart.reduce(
          (acc: number, cur: ServiceData) => {
            const quantity = cur.count;
            const price = cur.price;

            return acc + quantity * price;
          },
          0
        );
        const totalDiscount = discountCart.reduce(
          (acc: number, cur: DiscountData) => {
            return acc + cur.totalDiscount;
          },
          0
        );

        if (currencyCode === 'KRW') {
          setTotalPrice(totalPrice - totalDiscount);
        } else {
          const USDPrice = (totalPrice - totalDiscount) / exchangeRate;

          setTotalPrice(Math.floor(USDPrice * 100) / 100);
        }
      };

      getTotalPrice();
    }
  }, [serviceCart, discountCart, currencyCode]);

  return (
    <Cart
      serviceCart={serviceCart}
      discountCart={discountCart}
      totalPrice={totalPrice}
      serviceById={serviceById}
      currencyCode={currencyCode}
      onChangeQuantity={onChangeQuantity}
      removeCartService={removeCartService}
      removeCartDiscount={removeCartDiscount}
      applyDiscountToCart={applyDiscountToCart}
    />
  );
}
