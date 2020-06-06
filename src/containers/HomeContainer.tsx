import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { getService, toggleServiceCheckbox } from '../reducers/services';
import { addService, removeService } from '../reducers/cart';
import MenuList from '../components/MenuList';
import ErrorMessage from '../components/ErrorMessage';

export default function HomeContainer() {
  const { serviceById, allServiceIds, loading, errorMessage } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch();
  const menus = allServiceIds.map((id: string) => serviceById[id]);

  const onClickCheckbox = (id: string, checked: boolean) => {
    if (!checked) {
      dispatch(addService(serviceById[id]));
    } else {
      dispatch(removeService(id));
    }

    dispatch(toggleServiceCheckbox(id));
  };

  useEffect(() => {
    if (!allServiceIds.length) getService(dispatch)();
  }, [allServiceIds, dispatch]);

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

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
