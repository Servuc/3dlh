
// TODO: mode switch, mobile test

var Map = (function() {

  function loadStateFromURL() {
    var state = {};

    if (location.search) {
      var query = location.search.substring(1);
      query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) {
          state[$1] = $2;
        }
      });
    }

    return state;
  }

  var timer;
  function saveStateToURL(state) {
    if (!history.replaceState) {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(function() {
      var params = [];
      for (var key in state) {
        if (!state.hasOwnProperty(key)) continue;
        params.push( encodeURIComponent(key) +'='+ encodeURIComponent(state[key]) );
      }

      history.replaceState(null, '', '?'+ params.join('&'));
    }, 500);
  }

  //********************************************************************

  var Map = function(classicContainer, modernContainer) {
    Events.call(this);

    this.classicContainer = classicContainer;
    this.modernContainer = modernContainer;

    this.has3D = true;
    var canvas = document.createElement('CANVAS'), context;
    try { context = canvas.getContext('webgl'); } catch (ex) {}
    if (!context) try { canvas.getContext('experimental-webgl'); } catch (ex) {}
    if (!context) this.has3D = false;
    context = null;
    canvas = null;

    this.set3D(this.has3D);
  };

  Map.DEFAULT_LAT = 49.493559;
  Map.DEFAULT_LON = 0.1055623;
  Map.DEFAULT_ZOOM = 8;
  Map.MAX_ZOOM = 18;
  Map.MAX_EXTRA_ZOOM = Map.MAX_ZOOM+2;
  Map.TILE_SOURCE = 'http://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png';

  Map.prototype = Object.create(Events.prototype);

  Map.prototype.setState = function(state) {
    if (this.modernMap) {
      this.modernMap.setState(state);
    }
    if (this.classicMap) {
      this.classicMap.setState(state);
    }
  };

  Map.prototype.createModernMap = function(container) {
    var map = new MapModern(container);
    map.engine.on('click', function(e) {
      this.emit('interaction');
    }.bind(this));
    map.engine.on('change', function() {
      saveStateToURL(map.getState());
    });
    map.setState(loadStateFromURL());
    return map;
  };

  Map.prototype.createClassicMap = function(container) {

    return null;
  };

  Map.prototype.setPosition = function(x, y)
  {
    this.modernMap.setPosition(x, y);
  };

  // handle states!
  Map.prototype.set3D = function(flag) {
    if (flag && !this.has3D) {
      return;
    }

    if (flag) {
      this.classicContainer.classList.add('hidden');
      if (this.classicMap) {
        this.classicMap.destroy();
        this.classicMap = null;
      }
      this.modernContainer.classList.remove('hidden');
      this.modernMap = this.createModernMap(this.modernContainer);
      this.modernMap.setState(loadStateFromURL());
      this.is3D = true;
    } else {
      if (this.modernMap) {
        this.modernMap.destroy();
        this.modernMap = null;
      }
      this.classicContainer.classList.remove('hidden');
      this.modernContainer.classList.add('hidden');
      this.classicMap = this.createClassicMap(this.classicContainer);
      this.classicMap.setState(loadStateFromURL());
      this.is3D = false;
    }
  };

  return Map;

}());
