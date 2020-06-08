import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Discount from '../components/Discount';
import { DiscountData } from '../reducers/cart';

interface DiscountProps {
  discounts: Array<DiscountData>;
  handleDiscountCheckboxClick: (id: string, checked: boolean) => void;
  onDiscountSelectionComplete: () => void;
}

export default function DiscountList({
  discounts,
  handleDiscountCheckboxClick,
  onDiscountSelectionComplete
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
          onCheckboxClick={handleDiscountCheckboxClick}
        />
      ))}
      <Link to="/cart">
        <NextButton onClick={onDiscountSelectionComplete}>완료</NextButton>
      </Link>
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

const NextButton = styled.button`
  background-color: rgb(154, 134, 238);
  color: #ffffff;
  width: 80%;
  height: 5vh;
  border: 0;
  border-radius: 5px;
  margin-top: 30px;
  cursor: pointer;
`;
