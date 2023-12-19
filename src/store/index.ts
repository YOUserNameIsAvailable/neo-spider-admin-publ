'use client';

import { atom, selector, useRecoilTransaction_UNSTABLE } from 'recoil';

export const validateFieldState = atom({
    key: 'validateFieldState', // unique ID(다른 atom/selectors 와 구별하기 위함)
    default: '', // default value (=initial value)
})
