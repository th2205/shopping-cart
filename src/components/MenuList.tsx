import React, { SetStateAction, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Menu';

export interface MenuTypes {
  name: string;
  price: number;
  id: string;
  checked: boolean;
}

interface MenuProps {
  menus: Array<MenuTypes>;
  currentQuantity: number;
  setCurrentQuantity: Dispatch<SetStateAction<number>>;
  handleCheckboxClick: (id: string, checked: boolean) => void;
  onServiceSelectionComplete: () => void;
}

export default function MenuList({
  menus,
  currentQuantity,
  setCurrentQuantity,
  handleCheckboxClick,
  onServiceSelectionComplete
}: MenuProps) {
  return (
    <ServiceMenuContainer>
      <Title>서비스 메뉴</Title>
      {menus.map((menu) => (
        <Menu
          key={menu.id}
          name={menu.name}
          price={menu.price}
          id={menu.id}
          checked={menu.checked}
          currentQuantity={currentQuantity}
          setCurrentQuantity={setCurrentQuantity}
          onCheckboxClick={handleCheckboxClick}
        />
      ))}
      <Link to="/discount">
        <NextButton onClick={onServiceSelectionComplete}>완료</NextButton>
      </Link>
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

const NextButton = styled.button`
  background-color: rgb(154, 134, 238);
  color: #ffffff;
  width: 80%;
  height: 5vh;
  border: 0;
  border-radius: 5px;
  margin-top: 30px;
  cursor: pointer;
`;
