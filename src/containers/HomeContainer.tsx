import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { getService, ServiceByIdTypes } from '../reducers/services';
import Home from '../components/Home';

interface ServiceState {
  serviceById: ServiceByIdTypes;
  allServiceIds: string[];
  loading: boolean;
}

export default function HomeContainer() {
  const { serviceById, allServiceIds, loading }: ServiceState = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch();
  const menus = allServiceIds.map((id: string) => serviceById[id]);

  useEffect(() => {
    if (!allServiceIds.length) getService(dispatch)();
  }, [allServiceIds, dispatch]);

  return <>{loading ? <div>Loading</div> : <Home menus={menus} />}</>;
}
