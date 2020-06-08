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
  DiscountData,
  CartState
} from '../reducers/cart';
import {
  toggleServiceCheckbox,
  toggleDiscountCheckbox
} from '../reducers/services';
import { getExchangeRate } from '../utils/api';
import Cart from '../components/Cart';
import DiscountModal from '../components/DiscountModal';

export default function CartContainer() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [discountId, setDiscountId] = useState('');

  const {
    serviceCart,
    discountCart,
    subDiscountCart,
    subServiceCart
  }: CartState = useSelector((state: RootState) => state.cart);
  const { serviceById, currencyCode, discountById } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch();

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(changeQuantity(id, quantity));
    dispatch(calculatePrice(serviceById));
  };

  const handleServiceRemove = (id: string) => {
    dispatch(removeService(id));
    dispatch(toggleServiceCheckbox(id));
    dispatch(calculatePrice(serviceById));
  };

  const handleDiscountRemove = (id: string) => {
    dispatch(removeDiscount(id));
    dispatch(toggleDiscountCheckbox(id));
    dispatch(calculatePrice(serviceById));
    setIsVisible(!isVisible);
  };

  const handleDiscountApply = (serviceId: string, discountId: string) => {
    dispatch(applyDiscount(serviceId, discountId));
  };

  const handleEditButtonClick = (id: string) => {
    setIsVisible(!isVisible);
    setDiscountId(id);
  };

  const handleOKButtonClick = () => {
    setIsVisible(!isVisible);
    dispatch(calculatePrice(serviceById));
  };

  useEffect(() => {
    dispatch(calculatePrice(serviceById));
  }, [dispatch, serviceById]);

  useEffect(() => {
    const getTotalPrice = async () => {
      const exchangeRate: number = await getExchangeRate();
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

      if (currencyCode === 'KRW') {
        setTotalPrice(totalPrice - totalDiscount);
      } else {
        const USDPrice = (totalPrice - totalDiscount) / exchangeRate;

        setTotalPrice(Math.floor(USDPrice * 100) / 100);
      }
    };

    getTotalPrice();
  }, [serviceCart, discountCart, currencyCode]);

  return (
    <>
      <Cart
        serviceCart={serviceCart}
        discountCart={discountCart}
        subDiscountCart={subDiscountCart}
        subServiceCart={subServiceCart}
        totalPrice={totalPrice}
        serviceById={serviceById}
        currencyCode={currencyCode}
        handleQuantityChange={handleQuantityChange}
        handleServiceRemove={handleServiceRemove}
        handleEditButtonClick={handleEditButtonClick}
      />
      {isVisible && (
        <DiscountModal
          serviceById={serviceById}
          discountId={discountId}
          discountById={discountById}
          onDiscountChange={handleDiscountApply}
          onDeleteButtonClick={handleDiscountRemove}
          onOKButtonClick={handleOKButtonClick}
        />
      )}
    </>
  );
}
