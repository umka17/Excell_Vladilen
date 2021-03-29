import {DomListner} from '@core/DomListner';

export class ExcelComponent extends DomListner {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.storeSub = null;

    this.prepare();
  }

  // Настраивает наш компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей о событие
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на события event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  // Инициализируем наш компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем DOM слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
