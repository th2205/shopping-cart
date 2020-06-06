import React from 'react';
import styled from 'styled-components';
import { DiscountData, ServiceData } from '../reducers/cart';
import { ServiceByIdTypes } from '../reducers/services';
import { commaNumber } from '../utils/helper';

interface DiscountCartProps extends DiscountData {
  serviceCart: Array<ServiceData>;
  totalDiscount: number;
  serviceById: ServiceByIdTypes;
  removeCartDiscount: (id: string) => void;
  applyDiscountToCart: (serviceId: string, discountId: string) => void;
}

export default function DiscountCart({
  name,
  rate,
  id,
  targets,
  totalDiscount,
  serviceCart,
  serviceById,
  removeCartDiscount,
  applyDiscountToCart
}: DiscountCartProps) {
  const selectService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    const discountId = id;

    applyDiscountToCart(serviceId, discountId);
  };
  return (
    <DiscountCartContainer>
      <ServiceCartInfo>
        <Name>{name}</Name>
        {targets.map((serviceId) => (
          <Item key={serviceId}>
            {serviceById[serviceId].name}x{serviceById[serviceId].count}
          </Item>
        ))}
        <Rate>
          -{`${commaNumber(totalDiscount)}원 (${Math.round(rate * 100)}%)`}
        </Rate>
      </ServiceCartInfo>
      <select onChange={selectService}>
        <option value="all">수정</option>
        {serviceCart.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
      <RemoveButton onClick={() => removeCartDiscount(id)}>삭제</RemoveButton>
    </DiscountCartContainer>
  );
}

const DiscountCartContainer = styled.div`
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

const Rate = styled.p`
  margin: 0;
  padding: 0;
`;

const Item = styled.span`
  margin-right: 4px;
  font-size: 12px;
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
