import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/type';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}
export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}
