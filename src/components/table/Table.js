import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table_templete';
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  static className = 'excel__table'
  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    resizeHandler(this.$root, event);
  }
}
