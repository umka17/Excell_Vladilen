import {TABLE_RESIZE} from '@/redux/type';

export function rootReducer(state, action) {
  let prevState;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      action.data.type === 'col' ?
      field = 'colState' :
      field = 'rowState';
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return state = {...state, [field]: prevState};
    default: return state;
  }
}
