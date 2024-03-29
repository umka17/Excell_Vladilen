export class Emitter {
  constructor() {
    this.listeners = {};
  }
  // Уведомление слушателей если они есть
  // table.emit('table:select', {a:1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // Добавления нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] =
          this.listeners[event].filter((listener) => listener !== fn );
    };
  }
}
