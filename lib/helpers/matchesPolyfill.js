(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
      var i, matches;
      matches = (this.document || this.ownerDocument).querySelectorAll(s);
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {
        continue;
      }
      return i > -1;
    };
  }

}).call(this);
