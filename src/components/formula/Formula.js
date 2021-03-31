import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      listeners: ['input', 'keydown'],
      name: 'Formula',
      subscribe: ['currentText'],
      ...options,
    });
  }


  toHTML() {
    return ` <div class="info">fx</div>
 <div class="input" contenteditable="true" spellcheck="false"></div>`;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('.input');
    this.$on('table:select', (text) => {
      this.$formula.text(text);
    });

    // this.$subscribe((state) => {
    //   console.log('FormulaState', state.currentText);
    //   this.$formula.text(state.currentText);
    // });
  }

  storeChanged(changes) {
    console.log('change', changes);
    this.$formula.text(changes.currentText);
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
