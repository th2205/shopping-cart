import React from 'react';
import { render } from '@testing-library/react';
import DiscountList from '../components/DiscountList';

const mockProps = [
  {
    name: 'test',
    rate: 0.1,
    id: 'id',
    checked: false,
    targets: [],
    totalDiscount: 0
  }
];

const mockFunc = jest.fn();

describe('<DiscountList />', () => {
  it('should render DiscountList title', () => {
    const { getByText } = render(
      <DiscountList discounts={mockProps} onClickDiscountcheckbox={mockFunc} />
    );
    const servicePeice = getByText('할인');

    expect(servicePeice).toBeInTheDocument();
  });
});
