import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { toggleDiscountCheckbox } from '../reducers/services';
import {
  addDiscount,
  removeSubDiscountCartItem,
  removeAllSubDiscountCartItem,
  completeDiscount
} from '../reducers/cart';
import { changeDiscountCheckbox } from '../reducers/services';
import DiscountList from '../components/DiscountList';

export default function HomeContainer() {
  const { discountById, allDiscountIds, serviceById } = useSelector(
    (state: RootState) => state.services
  );
  const { serviceCart, discountCart }: any = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();
  const discounts = allDiscountIds.map((id: string) => discountById[id]);

  const handleDiscountCheckboxClick = (id: string, checked: boolean) => {
    if (!checked) {
      dispatch(addDiscount(discountById[id], serviceCart, serviceById));
    } else {
      dispatch(removeSubDiscountCartItem(id));
    }

    dispatch(toggleDiscountCheckbox(id));
  };

  const handleDiscountSelectionComplete = () => {
    dispatch(completeDiscount());
  };

  useEffect(() => {
    const resetSubDiscountCart = () => {
      dispatch(removeAllSubDiscountCartItem());
      dispatch(changeDiscountCheckbox(discountCart));
    };

    resetSubDiscountCart();

    return () => resetSubDiscountCart();
  }, [dispatch, discountCart]);

  return (
    <>
      {!discounts.length ? (
        <div>할인 없음</div>
      ) : (
        <DiscountList
          discounts={discounts}
          handleDiscountCheckboxClick={handleDiscountCheckboxClick}
          onDiscountSelectionComplete={handleDiscountSelectionComplete}
        />
      )}
    </>
  );
}
