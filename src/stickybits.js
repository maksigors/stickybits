function Stickybit(target, o) {
  const opts = {
    scrollTarget: window,
    stickyBitStickyOffset: 0,
    customVerticalPosition: false,
    monitorStickiness: false,
  };
  this.el = target;
  this.scrollTarget = (o && o.scrollTarget) || opts.scrollTarget;
  this.stickyBitStickyOffset = (o && o.stickyBitStickyOffset) || opts.stickyBitStickyOffset;
  this.customVerticalPosition = (o && o.customVerticalPosition) || opts.customVerticalPosition;
  this.monitorStickiness = (o && o.monitorStickiness) || opts.monitorStickiness;
  const browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  for (let i = 0; i < browserPrefix.length; i += 1) {
    this.el.style.position = `${browserPrefix[i]}sticky`;
  }
  let positionStickyVal = 'fixed';
  if (this.el.style.position !== '') {
    positionStickyVal = this.el.style.position;
    if (this.customVerticalPosition === false) {
      this.el.style.top = `${this.stickyBitStickyOffset}px`;
    }
    if (this.monitorStickiness === false) return;
  }
  const el = this.el;
  const customVerticalPosition = this.customVerticalPosition;
  const stickyBitStickyOffset = this.stickyBitStickyOffset;
  const elClasses = this.el.classList;
  const elParent = this.el.parentNode;
  const scrollTarget = this.scrollTarget;
  const stickyBitClass = 'js-is-sticky';
  const stickyBitIsStuckClass = 'js-is-stuck';
  const stickyBitStart = this.el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + elParent.offsetHeight) - this.el.offsetHeight;
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    const scroll = scrollTarget.scrollY;
    if (scroll < stickyBitStart) {
      if (elClasses.contains(stickyBitClass)) {
        elClasses.remove(stickyBitClass);
        el.style.position = '';
      }
      return;
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        el.style.bottom = '';
      }
      el.style.position = positionStickyVal;
      if (customVerticalPosition === false) {
        el.style.top = `${stickyBitStickyOffset}px`;
      }
      return;
    } else if (scroll > stickyBitStop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      el.style.top = '';
      el.style.bottom = '0';
      el.style.position = 'absolute';
      return;
    }
    return;
  }
  scrollTarget.addEventListener('scroll', () => scrollTarget.requestAnimationFrame(stickiness));
}
export default function stickybits(target, o) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  let stickyBit;
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    stickyBit = new Stickybit(el, o);
  }
  return stickyBit;
}
