import {storage} from '@core/utils';

function toHTML(item) {
  const state = storage(item);
  console.log(state);
  const id = item.split(':')[1];
  return `
   <li class="db__record">
     <a href="#excel/${id}">${state.title}</a>
     <stron>
        ${new Date(state.openedDate).toLocaleDateString()}
        ${new Date(state.openedDate).toLocaleTimeString()}
    </stron>
   </li>
`;
}

// excel:12331
// excel:12332
function getAllKeys() {
  const keys = [];
  for (let i = 0; i <localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  console.log(keys.length);
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }
  return `
   <div class="db__list-header">
     <span>Название</span>
     <span>Дата открытия</span>
   </div>
     <ul class="db__list">
        ${keys.map(toHTML).join('')}
     </ul>
  `;
}
