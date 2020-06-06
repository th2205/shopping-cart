import React from 'react';
import { render } from '@testing-library/react';
import MenuList from '../components/MenuList';

const mockProps = [{ name: 'test', price: 111, id: 'id', checked: false }];

const mockFunc = jest.fn();

describe('<MenuList />', () => {
  it('should render MenuList title', () => {
    const { getByText } = render(
      <MenuList menus={mockProps} onClickCheckbox={mockFunc} />
    );
    const servicePeice = getByText('서비스 메뉴');

    expect(servicePeice).toBeInTheDocument();
  });
});
