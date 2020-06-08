import React from 'react';
import styled from 'styled-components';

interface DiscountProps {
  name: string;
  rate: number;
  id: string;
  checked: boolean;
  onCheckboxClick: (id: string, checked: boolean) => void;
}

export default function Menu({
  name,
  rate,
  id,
  checked,
  onCheckboxClick
}: DiscountProps) {
  return (
    <DiscountContainer>
      <DiscountInfo>
        <Name>{name}</Name>
        <Rate>{Math.round(rate * 100)}%</Rate>
      </DiscountInfo>
      <input
        data-testid="discount-checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => onCheckboxClick(id, checked)}
      />
    </DiscountContainer>
  );
}

const DiscountContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 11vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const DiscountInfo = styled.div`
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
