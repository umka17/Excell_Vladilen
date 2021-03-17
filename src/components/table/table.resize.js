import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value = 0;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  // change col size
  if (type === 'col') {
    const prevColWidth = $parent.$el.style.width;
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);

    document.onmousemove = (ev) => {
      const delta = Math.floor(ev.pageX - coords.right);
      value = coords.width + delta;
      $resizer.css({
        right: -delta + 'px',
      });
    };

    document.onmouseup = () => {
      $parent.css({
        width: `${value ? value : prevColWidth}px`,
      });
      cells
          .forEach(
              (el) => el.style.width = `${value ? value : prevColWidth}px`);
      $resizer.css({
        right: 0,
        opacity: '',
        bottom: '',
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };
    document.ondblclick = () => {
      $parent.css({
        width: `120px`,
      });
      cells
          .forEach(
              (el) => el.style.width = `120px`);

      $resizer.css({
        right: 0,
        opacity: '',
        bottom: '',
      });

      document.onmousemove = null;
      document.ondblclick = null;
    };
  }

  // change row size
  if (type === 'row') {
    const prevCellHeight = $parent.$el.style.height;

    document.onmousemove = (ev) => {
      const delta = Math.floor(ev.pageY - event.pageY);
      value = coords.height + delta;

      $resizer.css({
        top: value + 'px',
      });
    };

    document.onmouseup = () => {
      $parent.css({
        height: `${value ? value : prevCellHeight}px`,
      });

      $resizer.css({
        bottom: 0,
        opacity: '',
        right: '',
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };

    document.ondblclick = () => {
      $parent.css({
        height: '24px',
      });

      $resizer.css({
        bottom: 0,
        opacity: '',
        right: '',
      });

      document.onmousemove = null;
      document.ondblclick = null;
    };
  }
}
