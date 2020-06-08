import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { getService, toggleServiceCheckbox } from '../reducers/services';
import {
  addService,
  completeService,
  removeSubServiceCartItem,
  removeAllSubServiceCartItem
} from '../reducers/cart';
import { changeServiceCheckbox } from '../reducers/services';
import MenuList from '../components/MenuList';
import ErrorMessage from '../components/ErrorMessage';

export default function HomeContainer() {
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const { serviceById, allServiceIds, loading, errorMessage } = useSelector(
    (state: RootState) => state.services
  );
  const { serviceCart }: any = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const menus = allServiceIds.map((id: string) => serviceById[id]);

  const handleCheckboxClick = (id: string, checked: boolean) => {
    if (!checked) {
      dispatch(addService(serviceById[id], currentQuantity));
    } else {
      dispatch(removeSubServiceCartItem(id));
    }

    dispatch(toggleServiceCheckbox(id));
  };

  const handleServiceSelectionComplete = () => {
    dispatch(completeService());
  };

  useEffect(() => {
    const resetSubServiceCart = () => {
      dispatch(removeAllSubServiceCartItem());
      dispatch(changeServiceCheckbox(serviceCart));
    };

    resetSubServiceCart();

    if (!allServiceIds.length) getService(dispatch)();

    return () => resetSubServiceCart();
  }, [allServiceIds, dispatch, serviceCart]);

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <MenuList
          menus={menus}
          currentQuantity={currentQuantity}
          setCurrentQuantity={setCurrentQuantity}
          handleCheckboxClick={handleCheckboxClick}
          onServiceSelectionComplete={handleServiceSelectionComplete}
        />
      )}
    </>
  );
}
