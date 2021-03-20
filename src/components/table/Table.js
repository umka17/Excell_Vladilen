import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table_templete';
import {resizeHandler} from '@/components/table/table.resize';
import {
  matrix,
  nextSelector,
  shouldResize}
  from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {isCell} from '@core/utils';


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options = {}) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      name: 'table',
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');

    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:input', $($cell).text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey === true) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => {
              return this.$root.find(`[data-id="${id}"]`);
            });
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
        this.$emit('table:input', $(event.target).text());
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowDown',
      'ArrowUp',
      'ArrowRight',
      'ArrowLeft',
      'Enter',
      'Tab',
      'Tab+LeftSh'];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text());
  }
}

