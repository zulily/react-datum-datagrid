(function() {
  var GridScroll, ReactDOM,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ReactDOM = require('react-dom');


  /*
    This mixin (see ./mixin.coffee) provides the scrolling syncronization between headers, 
    locked columns and free scrolling grids
   */

  module.exports = GridScroll = (function() {
    function GridScroll() {
      this._onHeaderScroll = bind(this._onHeaderScroll, this);
      this._onFreeGridScroll = bind(this._onFreeGridScroll, this);
      this._onLockedGridScroll = bind(this._onLockedGridScroll, this);
    }

    GridScroll.prototype.componentDidMount = function() {
      this._initializeScrolling();
      return typeof this.originalMethod === "function" ? this.originalMethod() : void 0;
    };

    GridScroll.prototype._initializeScrolling = function() {
      var freeGridEl, lockedGridEl, scrollingHeaderCellsEl;
      lockedGridEl = this._getLockedGridEl();
      freeGridEl = this._getFreeGridEl();
      lockedGridEl.addEventListener('scroll', (function(_this) {
        return function() {
          return _this._onLockedGridScroll();
        };
      })(this));
      freeGridEl.addEventListener('scroll', (function(_this) {
        return function() {
          return _this._onFreeGridScroll();
        };
      })(this));
      scrollingHeaderCellsEl = this._getScrollingHeadersEl();
      return scrollingHeaderCellsEl.addEventListener('scroll', (function(_this) {
        return function() {
          return _this._onHeaderScroll();
        };
      })(this));
    };

    GridScroll.prototype._getLockedGridEl = function() {
      return ReactDOM.findDOMNode(this).querySelector('.rdd-locked-grid .rdd-rv-grid');
    };

    GridScroll.prototype._getFreeGridEl = function() {
      return ReactDOM.findDOMNode(this).querySelector('.rdd-free-grid .rdd-rv-grid');
    };

    GridScroll.prototype._getScrollingHeadersEl = function() {
      return ReactDOM.findDOMNode(this).querySelector('.rdd-scrolling-header-cells');
    };

    GridScroll.prototype._onLockedGridScroll = function() {
      var freeGridEl, lockedGridEl;
      if (!this._isFreeGridInitiatedScrolling) {
        this._isLockedGridInitiatedScrolling = true;
        lockedGridEl = this._getLockedGridEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          freeGridEl.scrollTop = lockedGridEl.scrollTop;
        } else {
          freeGridEl.scrollLeft = lockedGridEl.scrollLeft;
        }
      }
      return this._isFreeGridInitiatedScrolling = false;
    };

    GridScroll.prototype._onFreeGridScroll = function() {
      var freeGridEl, lockedGridEl, scrollingHeaderCellsEl;
      if (!(this._isLockedGridInitiatedScrolling || this._isLabelInitiatedScrolling)) {
        this._isFreeGridInitiatedScrolling = true;
        lockedGridEl = this._getLockedGridEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          lockedGridEl.scrollTop = freeGridEl.scrollTop;
        } else {
          lockedGridEl.scrollLeft = freeGridEl.scrollLeft;
        }
      }
      this._isLockedGridInitiatedScrolling = false;
      if (!this._isLabelInitiatedScrolling) {
        scrollingHeaderCellsEl = this._getScrollingHeadersEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          scrollingHeaderCellsEl.scrollLeft = freeGridEl.scrollLeft;
        } else {
          scrollingHeaderCellsEl.scrollTop = freeGridEl.scrollTop;
        }
      }
      return this._isLabelInitiatedScrolling = false;
    };

    GridScroll.prototype._onHeaderScroll = function() {
      var freeGridEl, scrollingHeaderCellsEl;
      if (!this._isFreeGridInitiatedScrolling) {
        this._isLabelInitiatedScrolling = true;
        scrollingHeaderCellsEl = this._getScrollingHeadersEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          freeGridEl.scrollLeft = scrollingHeaderCellsEl.scrollLeft;
        } else {
          freeGridEl.scrollTop = scrollingHeaderCellsEl.scrollTop;
        }
      }
      return this._isFreeGridInitiatedScrolling = false;
    };

    return GridScroll;

  })();

}).call(this);
