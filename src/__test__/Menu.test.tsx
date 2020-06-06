import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from '../components/Menu';

const mockProps = {
  name: 'test',
  price: 111,
  id: 'id',
  checked: false,
  onClickCheckboxame: jest.fn()
};

describe('<Menu />', () => {
  it('should render service info', () => {
    const { getByText } = render(
      <Menu
        name={mockProps.name}
        price={mockProps.price}
        id={mockProps.id}
        checked={mockProps.checked}
        onClickCheckbox={mockProps.onClickCheckboxame}
      />
    );
    const serviceName = getByText(mockProps.name);
    const servicePeice = getByText(`${mockProps.price}원`);

    expect(serviceName).toBeInTheDocument();
    expect(servicePeice).toBeInTheDocument();
  });

  it('should called onClickCheckbox function when checkbox is clicked', () => {
    const { getByTestId } = render(
      <Menu
        name={mockProps.name}
        price={mockProps.price}
        id={mockProps.id}
        checked={mockProps.checked}
        onClickCheckbox={mockProps.onClickCheckboxame}
      />
    );
    const menuCheckbox = getByTestId('menu-checkbox');

    fireEvent.click(menuCheckbox);

    expect(mockProps.onClickCheckboxame.mock.calls.length).toBe(1);
  });
});
