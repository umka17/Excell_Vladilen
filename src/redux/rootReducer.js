import {CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/type';

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
    case CHANGE_TEXT:
      prevState = state['dataState'] || {};
      prevState[action.data.id] = action.data.value;
      return state = {
        ...state,
        currentText: action.data.value,
        dataState: prevState,
      };
    case CHANGE_TITLE:
      console.log('title', action.title);
      return state = {...state, title: action.title};
    default: return state;
  }
}
