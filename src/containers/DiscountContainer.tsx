import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { toggleDiscountCheckbox } from '../reducers/services';
import { addDiscount, removeDiscount } from '../reducers/cart';
import DiscountList from '../components/DiscountList';

export default function HomeContainer() {
  const { discountById, allDiscountIds, serviceById } = useSelector(
    (state: RootState) => state.services
  );
  const { serviceCart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const discounts = allDiscountIds.map((id: string) => discountById[id]);

  const onClickDiscountcheckbox = (id: string, checked: boolean) => {
    if (!checked) {
      dispatch(addDiscount(discountById[id], serviceCart, serviceById));
    } else {
      dispatch(removeDiscount(id));
    }

    dispatch(toggleDiscountCheckbox(id));
  };
  return (
    <>
      {!discounts.length ? (
        <div>할인 없음</div>
      ) : (
        <DiscountList
          discounts={discounts}
          onClickDiscountcheckbox={onClickDiscountcheckbox}
        />
      )}
    </>
  );
}
