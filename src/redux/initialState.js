import {storage} from '@core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  title: 'Новая таблица',
};

export const initialState = storage('excel-state') ?
storage('excel-state') :
defaultState;
