
var Events = function() {
  this._listeners = {};
};

Events.prototype = {

  on: function(type, callback) {
    if (!this._listeners[type]) {
      this._listeners[type] = [];
    }
    this._listeners[type].push(callback);
    return this;
  },

  off: function(type, callback) {
    if (this._listeners[type]) {
      this._listeners[type] = this._listeners[type].filter(function(listener) {
        return (listener !== callback);
      });
    }
    return this;
  },

  emit: function(type, payload) {
    (this._listeners[type] || []).forEach(function(listener) {
      listener(payload);
    });
    return this;
  },

  destroy: function() {
    this._listeners = {};
  }
};
