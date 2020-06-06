import React from 'react';
import styled from 'styled-components';
import { ServiceData } from '../reducers/cart';

interface ServiceCartProps extends ServiceData {
  onChangeQuantity: (id: string, quantity: number) => void;
  removeCartService: (id: string) => void;
}

export default function ServiceCart({
  name,
  price,
  id,
  count,
  onChangeQuantity,
  removeCartService
}: ServiceCartProps) {
  const selectCheckbox = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);

    onChangeQuantity(id, value);
  };

  return (
    <ServiceCartContainer>
      <ServiceCartInfo>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </ServiceCartInfo>
      <select onChange={selectCheckbox} defaultValue={count}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button onClick={() => removeCartService(id)}>삭제</button>
    </ServiceCartContainer>
  );
}

const ServiceCartContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 11vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ServiceCartInfo = styled.div`
  padding: 10px;
  width: 50%;
  text-align: left;
`;

const Name = styled.p`
  margin-bottom: 0.5vh;
  padding: 0;
`;

const Price = styled.p`
  margin: 0;
  padding: 0;
`;
