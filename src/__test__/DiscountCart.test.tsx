import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DiscountCart from '../components/DiscountCart';

const mockData = {
  name: '지인 할인',
  rate: 0.08,
  id: 'd_1',
  checked: true,
  targets: ['i_1', 'i_2', 'i_3'],
  totalDiscount: 7600
};

const mockServiceCartData = [
  {
    checked: true,
    count: 1,
    id: 'i_1',
    name: '여성컷',
    price: 35000
  },
  {
    checked: true,
    count: 1,
    id: 'i_2',
    name: '남성컷',
    price: 30000
  },
  {
    checked: true,
    count: 1,
    id: 'i_3',
    name: '드라이',
    price: 30000
  }
];

const mockServiceById = {
  i_1: { count: 1, name: '여성컷', price: 35000, id: 'i_1', checked: true },
  i_2: { count: 1, name: '남성컷', price: 30000, id: 'i_2', checked: true },
  i_3: { count: 1, name: '드라이', price: 30000, id: 'i_3', checked: true }
};

const mockFunc = {
  removeCartDiscount: jest.fn(),
  applyDiscountToCart: jest.fn()
};

describe('<DiscountCart />', () => {
  it('should render discount info', () => {
    const { getByText } = render(
      <DiscountCart
        name={mockData.name}
        rate={mockData.rate}
        id={mockData.id}
        targets={mockData.targets}
        totalDiscount={mockData.totalDiscount}
        checked={mockData.checked}
        serviceById={mockServiceById}
        serviceCart={mockServiceCartData}
        removeCartDiscount={mockFunc.removeCartDiscount}
        applyDiscountToCart={mockFunc.applyDiscountToCart}
      />
    );
    const DicountName = getByText(mockData.name);
    const DicountPeice = getByText(`(${Math.round(mockData.rate * 100)}%)`);

    expect(DicountName).toBeInTheDocument();
    expect(DicountPeice).toBeInTheDocument();
  });
});
