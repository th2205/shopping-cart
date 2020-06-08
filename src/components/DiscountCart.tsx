import React from 'react';
import styled from 'styled-components';
import { DiscountData } from '../reducers/cart';
import { ServiceByIdTypes } from '../reducers/services';
import { commaNumber } from '../utils/helper';

interface DiscountCartProps extends DiscountData {
  totalDiscount: number;
  serviceById: ServiceByIdTypes;
  onEditButtonClick: (id: string) => void;
}

export default function DiscountCart({
  name,
  rate,
  id,
  targets,
  totalDiscount,
  serviceById,
  onEditButtonClick
}: DiscountCartProps) {
  return (
    <DiscountCartContainer>
      <DiscountCartInfo>
        <Name>{name}</Name>
        {targets.map((targetObj) => (
          <Item key={targetObj.id}>
            {targetObj.checked && (
              <span>
                {serviceById[targetObj.id].name}x
                {serviceById[targetObj.id].count}
              </span>
            )}
          </Item>
        ))}
        <Rate>
          <span>-{`${commaNumber(totalDiscount)}`}</span>
          <span>({`${Math.round(rate * 100)}%`})</span>
        </Rate>
      </DiscountCartInfo>
      <EditButton onClick={() => onEditButtonClick(id)}>수정</EditButton>
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

const DiscountCartInfo = styled.div`
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

const EditButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
  border: 0;
  outline: none;
  background-color: rgb(197, 210, 221);
  color: #ffffff;
  cursor: pointer;
`;
