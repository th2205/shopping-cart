import React from 'react';
import { render } from '@testing-library/react';
import Cart from '../components/Cart';
import { ServiceData, DiscountData } from '../reducers/cart';
import { commaNumber } from '../utils/helper';

function getTotalPrice(
  serviceCart: ServiceData[],
  discountCart: DiscountData[]
) {
  const totalPrice = serviceCart.reduce((acc: number, cur: ServiceData) => {
    const quantity = cur.count;
    const price = cur.price;

    return acc + quantity * price;
  }, 0);

  const totalDiscount = discountCart.reduce(
    (acc: number, cur: DiscountData) => {
      return acc + cur.totalDiscount;
    },
    0
  );

  return totalPrice - totalDiscount;
}

const emptyArray: [] = [];

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

const mockDicountCartData = [
  {
    name: '지인 할인',
    rate: 0.08,
    id: 'd_1',
    checked: true,
    targets: ['i_1', 'i_2', 'i_3'],
    totalDiscount: 7600
  },
  {
    name: '학생 할인',
    rate: 0.07,
    id: 'd_2',
    checked: true,
    targets: ['i_1', 'i_2', 'i_3'],
    totalDiscount: 6650
  },
  {
    name: '회원권 할인',
    rate: 0.1,
    id: 'd_3',
    checked: true,
    targets: ['i_1', 'i_2', 'i_3'],
    totalDiscount: 9500
  }
];

const mockServiceById = {
  i_1: { count: 1, name: '여성컷', price: 35000, id: 'i_1', checked: true },
  i_2: { count: 1, name: '남성컷', price: 30000, id: 'i_2', checked: true },
  i_3: { count: 1, name: '드라이', price: 30000, id: 'i_3', checked: true }
};

const mockFunc = {
  onChangeQuantity: jest.fn(),
  removeCartService: jest.fn(),
  removeCartDiscount: jest.fn(),
  applyDiscountToCart: jest.fn()
};

let mockTotalPrice: number = getTotalPrice(
  mockServiceCartData,
  mockDicountCartData
);

let mockCurrencyCode: string = 'KRW';

describe('<Cart />', () => {
  it('should render text when array is empty', () => {
    const { getByText } = render(
      <Cart
        serviceCart={emptyArray}
        discountCart={emptyArray}
        currencyCode={mockCurrencyCode}
        totalPrice={mockTotalPrice}
        serviceById={mockServiceById}
        onChangeQuantity={mockFunc.onChangeQuantity}
        removeCartService={mockFunc.removeCartService}
        removeCartDiscount={mockFunc.removeCartDiscount}
        applyDiscountToCart={mockFunc.applyDiscountToCart}
      />
    );
    const service = getByText('서비스를 선택해주세요');
    const discount = getByText('할인을 선택해주세요');

    expect(service).toBeInTheDocument();
    expect(discount).toBeInTheDocument();
  });

  it('should render total price', () => {
    const { getByText } = render(
      <Cart
        serviceCart={mockServiceCartData}
        discountCart={mockDicountCartData}
        totalPrice={mockTotalPrice}
        currencyCode={mockCurrencyCode}
        serviceById={mockServiceById}
        onChangeQuantity={mockFunc.onChangeQuantity}
        removeCartService={mockFunc.removeCartService}
        removeCartDiscount={mockFunc.removeCartDiscount}
        applyDiscountToCart={mockFunc.applyDiscountToCart}
      />
    );

    const totalPrice = getByText(`${commaNumber(mockTotalPrice)}`);

    expect(totalPrice).toBeInTheDocument();
  });
});
