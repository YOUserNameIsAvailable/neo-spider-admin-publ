'use client';

import { ExcelExport } from '@progress/kendo-react-excel-export';
import { atom, selector, useRecoilTransaction_UNSTABLE } from 'recoil';

export const validateFieldState = atom({
    key: 'validateFieldState', // unique ID(다른 atom/selectors 와 구별하기 위함)
    default: '', // default value (=initial value)
})

export const exportExcelState = atom({
    key: 'exportExcelState',
})

export const isExportExcelState = atom({
    key: 'exportExcelDataState',
    default: false,
})
