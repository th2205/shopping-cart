import React from 'react';
import MenuList from './MenuList';

interface Menu {
  name: string;
  price: number;
  id: string;
  checked: boolean;
}

interface HomeProps {
  menus: Array<Menu>;
  onClickCheckbox: (id: string, checked: boolean) => void;
}

export default function Home({ menus, onClickCheckbox }: HomeProps) {
  return <MenuList menus={menus} onClickCheckbox={onClickCheckbox} />;
}
