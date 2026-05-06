export default class Popover {
  constructor(element, title, content) {
    this._element = element;
    this._title = title;
    this._content = content;
    this._popover = null;
    this._shown = false;

    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
    this._toggle = this._toggle.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);

    this._element.addEventListener('click', this._toggle);
  }

  _createPopoverElement() {
    this._popover = document.createElement('div');
    this._popover.className = 'popover';

    const arrow = document.createElement('div');
    arrow.className = 'popover-arrow';

    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = this._title;

    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = this._content;

    this._popover.append(arrow);
    this._popover.append(header);
    this._popover.append(body);

    document.body.append(this._popover);
  }

  _position() {
    const elementRect = this._element.getBoundingClientRect();
    const popoverRect = this._popover.getBoundingClientRect();

    const elementCenterX = elementRect.left + elementRect.width / 2;
    const popoverLeft = elementCenterX - popoverRect.width / 2;
    const popoverTop = elementRect.top - popoverRect.height - 14;

    this._popover.style.left = `${popoverLeft + window.scrollX}px`;
    this._popover.style.top = `${popoverTop + window.scrollY}px`;
  }

  _show() {
    if (this._shown) return;

    this._createPopoverElement();
    this._position();
    this._shown = true;

    setTimeout(() => {
      document.addEventListener('click', this._handleClickOutside);
    }, 0);
  }

  _hide() {
    if (!this._shown) return;

    if (this._popover) {
      this._popover.remove();
      this._popover = null;
    }
    this._shown = false;

    document.removeEventListener('click', this._handleClickOutside);
  }

  _toggle(event) {
    event.stopPropagation();
    if (this._shown) {
      this._hide();
    } else {
      this._show();
    }
  }

  _handleClickOutside(event) {
    if (this._popover && !this._popover.contains(event.target) && event.target !== this._element) {
      this._hide();
    }
  }
}