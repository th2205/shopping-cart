import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import {
  getService,
  ServiceByIdTypes,
  toggleCheckbox
} from '../reducers/services';
import { addToCart, removeFromCart } from '../reducers/cart';
import MenuList from '../components/MenuList';

interface State {
  serviceById: ServiceByIdTypes;
  allServiceIds: string[];
  loading: boolean;
}

export default function HomeContainer() {
  const { serviceById, allServiceIds, loading }: State = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch();
  const menus = allServiceIds.map((id: string) => serviceById[id]);

  const onClickCheckbox = (id: string, checked: boolean) => {
    if (!checked) {
      dispatch(addToCart(serviceById[id]));
    } else {
      dispatch(removeFromCart(id));
    }

    dispatch(toggleCheckbox(id));
  };

  useEffect(() => {
    if (!allServiceIds.length) getService(dispatch)();
  }, [allServiceIds, dispatch]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <MenuList menus={menus} onClickCheckbox={onClickCheckbox} />
      )}
    </>
  );
}
