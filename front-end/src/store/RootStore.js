import React, { useContext } from 'react';
import { authStore } from './AuthStore';
import { MobXProviderContext } from 'mobx-react';

export const createStore = () => {
  return { authStore };
};

export const useStore = () => {
  return useContext(MobXProviderContext);
};
