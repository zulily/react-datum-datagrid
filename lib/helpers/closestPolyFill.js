(function() {
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el, i, matches;
      matches = (this.document || this.ownerDocument).querySelectorAll(s);
      i = void 0;
      el = this;
      while (true) {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {
          continue;
        }
        if (!(i < 0 && (el = el.parentElement))) {
          break;
        }
      }
      return el;
    };
  }

}).call(this);
