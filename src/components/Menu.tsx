import React from 'react';
import { MenuTypes } from './MenuList';
import styled from 'styled-components';
import { commaNumber } from '../utils/helper';

interface MenuProps extends MenuTypes {
  onClickCheckbox: (id: string, checked: boolean) => void;
}

export default function Menu({
  name,
  price,
  id,
  checked,
  onClickCheckbox
}: MenuProps) {
  return (
    <MenuContainer>
      <MenuInfo>
        <Name>{name}</Name>
        <Price>{commaNumber(price)}</Price>
      </MenuInfo>
      <input
        data-testid="menu-checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => onClickCheckbox(id, checked)}
      />
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 11vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const MenuInfo = styled.div`
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
