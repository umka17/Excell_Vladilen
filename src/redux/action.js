import {CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/type';

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

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title,
  };
}
