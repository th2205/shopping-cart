import React from 'react';
import styled from 'styled-components';
import Discount from '../components/Discount';
import { DiscountData } from '../reducers/cart';

interface DiscountProps {
  discounts: Array<DiscountData>;
  onClickDiscountcheckbox: (id: string, checked: boolean) => void;
}

export default function DiscountList({
  discounts,
  onClickDiscountcheckbox
}: DiscountProps) {
  return (
    <DiscountMenuContainer>
      <Title>할인</Title>
      {discounts.map((discount) => (
        <Discount
          key={discount.id}
          name={discount.name}
          rate={discount.rate}
          checked={discount.checked}
          id={discount.id}
          onClickDiscountcheckbox={onClickDiscountcheckbox}
        />
      ))}
    </DiscountMenuContainer>
  );
}

const Title = styled.h4`
  margin: 0;
`;

const DiscountMenuContainer = styled.div`
  width: 70%;
  height: auto;
  padding: 10px;
  margin: 0 auto 20px auto;
  background-color: #ffffff;
  border: 1px solid rgba(37, 38, 42, 0.2);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  border-radius: 10px;
`;
