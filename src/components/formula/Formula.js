import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      listeners: ['input', 'keydown'],
      name: 'Formula',
      ...options,
    });
  }


  toHTML() {
    return ` <div class="info">fx</div>
 <div class="input" contenteditable="true" spellcheck="false"></div>`;
  }

  init() {
    super.init();

    const $formula = this.$root.find('.input');
    this.$on('table:input', (text) => {
      $formula.text(text);
    });

    // this.$subscribe((state) => {
    //   console.log('FormulaState', this.store.getState());
    // });
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }
}
