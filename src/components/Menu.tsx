import React from 'react';

interface MenuProps {
  name: string;
  price: number;
  id?: string;
}

export default function Menu({ name, price, id }: MenuProps) {
  return (
    <div>
      <span>{name}</span>
      <span>{price}</span>
      <input type="checkbox" />
    </div>
  );
}
