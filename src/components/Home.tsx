import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

interface Menu {
  name: string;
  price: number;
  id?: string;
}

interface HomeProps {
  menus: Array<Menu>;
}

export default function Home({ menus }: HomeProps) {
  console.log(menus);
  return (
    <ServiceMenuContainer>
      <Title>서비스 메뉴</Title>
      {menus.map((menu) => (
        <Menu key={menu.id} name={menu.name} price={menu.price} id={menu.id} />
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
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid rgba(37, 38, 42, 0.2);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  border-radius: 10px;
`;
