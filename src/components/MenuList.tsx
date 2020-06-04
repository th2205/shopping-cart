import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

interface Menu {
  name: string;
  price: number;
  id: string;
  checked: boolean;
}

interface MenuProps {
  menus: Array<Menu>;
  onClickCheckbox: (id: string, checked: boolean) => void;
}

export default function MenuList({ menus, onClickCheckbox }: MenuProps) {
  return (
    <ServiceMenuContainer>
      <Title>서비스 메뉴</Title>
      {menus.map((menu: Menu) => (
        <Menu
          key={menu.id}
          name={menu.name}
          price={menu.price}
          id={menu.id}
          checked={menu.checked}
          onClickCheckbox={onClickCheckbox}
        />
      ))}
    </ServiceMenuContainer>
  );
}

const Title = styled.h4`
  margin: 0;
`;

const ServiceMenuContainer = styled.div`
  width: 70%;
  height: auto;
  padding: 10px;
  margin: 0 auto 20px auto;
  background-color: #ffffff;
  border: 1px solid rgba(37, 38, 42, 0.2);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  border-radius: 10px;
`;
