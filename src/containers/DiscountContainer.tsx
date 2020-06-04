import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import {
  DiscountByIdTypes,
  toggleDiscountCheckbox
} from '../reducers/services';
import { addDiscount, removeDiscount } from '../reducers/cart';
import DiscountList from '../components/DiscountList';

interface State {
  discountById: any;
  allDiscountIds: string[];
}

export default function HomeContainer() {
  const { discountById, allDiscountIds } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch();
  const discounts = allDiscountIds.map((id: string) => discountById[id]);

  const onClickDiscountcheckbox = (id: string, checked: boolean) => {
    if (!checked) {
      dispatch(addDiscount(discountById[id]));
    } else {
      dispatch(removeDiscount(id));
    }

    dispatch(toggleDiscountCheckbox(id));
  };
  return (
    <>
      {!discounts.length ? (
        <div>x</div>
      ) : (
        <DiscountList
          discounts={discounts}
          onClickDiscountcheckbox={onClickDiscountcheckbox}
        />
      )}
    </>
  );
}
