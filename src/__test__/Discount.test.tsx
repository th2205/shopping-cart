import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Discount from '../components/Discount';

const mockData = {
  name: 'test',
  rate: 0.1,
  id: 'id',
  checked: false,
  onClickDiscountcheckbox: jest.fn()
};

describe('<Discount />', () => {
  it('should render discount info', () => {
    const { getByText } = render(
      <Discount
        name={mockData.name}
        rate={mockData.rate}
        id={mockData.id}
        checked={mockData.checked}
        onClickDiscountcheckbox={mockData.onClickDiscountcheckbox}
      />
    );
    const DicountName = getByText(mockData.name);
    const DicountPeice = getByText(`${Math.round(mockData.rate * 100)}%`);

    expect(DicountName).toBeInTheDocument();
    expect(DicountPeice).toBeInTheDocument();
  });

  it('should called onClickDiscountcheckbox function when checkbox is clicked', () => {
    const { getByTestId } = render(
      <Discount
        name={mockData.name}
        rate={mockData.rate}
        id={mockData.id}
        checked={mockData.checked}
        onClickDiscountcheckbox={mockData.onClickDiscountcheckbox}
      />
    );
    const discountCheckbox = getByTestId('discount-checkbox');

    fireEvent.click(discountCheckbox);

    expect(mockData.onClickDiscountcheckbox.mock.calls.length).toBe(1);
  });
});
