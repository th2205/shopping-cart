import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <HeaderContainer>
      <Item>임태현</Item>
      <Item>
        <Link to="/">
          <HomeButton>Home</HomeButton>
        </Link>
        <Link to="/cart">
          <CartButton>장바구니</CartButton>
        </Link>
      </Item>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6vh;
  border-bottom: 1px solid rgba(37, 38, 42, 0.2);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  background-color: #ffffff;
  margin-bottom: 20px;
`;

const Item = styled.li`
  list-style: none;
  margin: 0 50px;
  padding: 0;
`;

const CartButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
  border: 0;
  outline: none;
  background-color: rgba(86, 229, 156, 0.9);
  color: #ffffff;
  cursor: pointer;
`;

const HomeButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
  border: 0;
  outline: none;
  background-color: rgb(197, 210, 221);
  color: #ffffff;
  cursor: pointer;
  margin-right: 10px;
`;
