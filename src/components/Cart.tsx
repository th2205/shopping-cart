import React from 'react';
import styled from 'styled-components';

export default function Cart() {
  return (
    <CartContainer>
      <Title>장바구니</Title>
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
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid rgba(37, 38, 42, 0.2);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  border-radius: 10px;
`;
