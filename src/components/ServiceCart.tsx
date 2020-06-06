import React from 'react';
import styled from 'styled-components';
import { ServiceData } from '../reducers/cart';
import { commaNumber } from '../utils/helper';

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
  const totalPrice = count * price;

  return (
    <ServiceCartContainer>
      <ServiceCartInfo>
        <Name>{name}</Name>
        <Price>{commaNumber(totalPrice)}</Price>
      </ServiceCartInfo>
      <select onChange={selectCheckbox} defaultValue={count}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <RemoveButton onClick={() => removeCartService(id)}>삭제</RemoveButton>
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

const RemoveButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
  border: 0;
  outline: none;
  background-color: #d92027;
  color: #ffffff;
  cursor: pointer;
`;
