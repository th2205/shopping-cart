import React, { Dispatch, SetStateAction } from 'react';
import { MenuTypes } from './MenuList';
import styled from 'styled-components';
import { commaNumber } from '../utils/helper';

interface MenuProps extends MenuTypes {
  currentQuantity: number;
  setCurrentQuantity: Dispatch<SetStateAction<number>>;
  onCheckboxClick: (id: string, checked: boolean) => void;
}

export default function Menu({
  name,
  price,
  id,
  checked,
  currentQuantity,
  setCurrentQuantity,
  onCheckboxClick
}: MenuProps) {
  const selectCheckbox = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);

    setCurrentQuantity(value);
  };

  return (
    <MenuContainer>
      <MenuInfo>
        <Name>{name}</Name>
        <Price>{commaNumber(price)}</Price>
      </MenuInfo>
      <select onChange={selectCheckbox} defaultValue={currentQuantity}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input
        data-testid="menu-checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => onCheckboxClick(id, checked)}
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
