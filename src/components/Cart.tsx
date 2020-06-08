import React from 'react';
import { CartState } from '../reducers/cart';
import { ServiceByIdTypes } from '../reducers/services';
import styled from 'styled-components';
import ServiceCart from './ServiceCart';
import DiscountCart from './DiscountCart';
import { commaNumber } from '../utils/helper';

interface CartProps extends CartState {
  totalPrice: number;
  serviceById: ServiceByIdTypes;
  currencyCode: string;
  handleQuantityChange: (id: string, quantity: number) => void;
  handleServiceRemove: (id: string) => void;
  handleEditButtonClick: (id: string) => void;
}

export default function Cart({
  serviceCart,
  discountCart,
  totalPrice,
  serviceById,
  currencyCode,
  handleQuantityChange,
  handleServiceRemove,
  handleEditButtonClick
}: CartProps) {
  return (
    <CartContainer>
      <Title>장바구니</Title>
      <h4>시술</h4>
      {serviceCart.length ? (
        <div>
          {serviceCart.map((service) => (
            <ServiceCart
              key={service.id}
              count={service.count}
              name={service.name}
              price={service.price}
              id={service.id}
              checked={service.checked}
              onSelecBoxClick={handleQuantityChange}
              onDeleteButtonClick={handleServiceRemove}
            />
          ))}
        </div>
      ) : (
        <div>서비스를 선택해주세요</div>
      )}
      <h4>할인</h4>
      {discountCart.length ? (
        <div>
          {discountCart.map((discount) => (
            <DiscountCart
              key={discount.id}
              name={discount.name}
              rate={discount.rate}
              id={discount.id}
              checked={discount.checked}
              targets={discount.targets}
              totalDiscount={discount.totalDiscount}
              serviceCart={serviceCart}
              serviceById={serviceById}
              onEditButtonClick={handleEditButtonClick}
            />
          ))}
        </div>
      ) : (
        <div>할인을 선택해주세요</div>
      )}
      <TotlaPriceContainer>
        <div>합계</div>
        <div>{commaNumber(totalPrice, currencyCode)}</div>
      </TotlaPriceContainer>
    </CartContainer>
  );
}

const Title = styled.h4`
  margin: 0;
`;

const CartContainer = styled.div`
  width: 70%;
  min-height: 20vh;
  padding: 10px;
  margin: 0 auto 20px auto;
  background-color: #ffffff;
  border: 1px solid rgba(37, 38, 42, 0.2);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  border-radius: 10px;
`;

const TotlaPriceContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px auto 0 auto;
  padding: 20px 0;
  font-size: 25px;
`;
