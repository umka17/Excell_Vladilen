export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  const listeners = [];
  return {
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((sub) => sub(state));
    },
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners.filter((listener) => listener !== fn);
        },
      };
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
}

// class createStore {
//   constructor(rootReducer, initialState) {
//     this.state = rootReducer(initialState, {type: '__INIT__'});
//     this.listeners = [];
//   }
//   dispatch(action) {
//     this.state = rootReducer(this.state, action)
//     this.listeners.forEach((listener) => listener())
//   }
//   subscribe(listener) {
//     this.listeners.push(listener);
//   }
//   getState() {
//     return this.state
//   }
// }
