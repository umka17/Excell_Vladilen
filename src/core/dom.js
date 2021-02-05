// this ==== $root
class Dom {
  constructor(selector) {
    // eslint-disable-next-line max-len
    this.$el =( typeof selector === 'string' ? document.querySelector(selector) : selector);
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  on(listener, callback) {
    this.$el.addEventListener(listener, callback);
  }

  off(listener, callback ) {
    this.$el.removeEventListener(listener, callback);
  }

  get data() {
    return this.$el.dataset;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object
        .entries(styles)
        .forEach((item) =>{
          this.$el.style[item[0]] = item[1];
        });
  }


  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCordinats() {
    return this.$el.getBoundingClientRect();
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes) => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
