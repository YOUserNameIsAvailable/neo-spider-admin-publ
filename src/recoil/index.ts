'use client';

import { atom, useRecoilTransaction_UNSTABLE } from 'recoil';

export const themeState = atom<any>({
    key: 'themes',
    default: null,
});

export const tests = useRecoilTransaction_UNSTABLE(({ get, set }) => async (distance) => {
    const themes = get(themeState) as any;

    if (!themes) {
        console.log(123123, themes)
        set(themeState, themes);
    }
});
