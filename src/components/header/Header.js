import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/action';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      subscribe: ['title'],
      listeners: ['input'],
      ...options,
    });
  }
  static className = 'excel__header'
  toHTML() {
    const title = this.store.getState().title;
    return ` <input 
                    type="text" 
                    name="nameTable" 
                    class="input" 
                    id="name-table-field" 
                    value="${title}">
                <div>
                    <div class="button">
                        <span class="material-icons">delete</span>
                    </div>
              
                    <div class="button">
                        <span class="material-icons">exit_to_app</span>
                    </div>`;
  }

  onInput(event) {
    this.$dispatch(changeTitle($(event.target).text()));
  }
}
