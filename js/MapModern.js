
var MapModern = (function() {

  var constructor = function(container) {
    this.container = container;
    this.engine = new GLMap(container.id, {
      position: { latitude: Map.DEFAULT_LAT, longitude: Map.DEFAULT_LON },
      zoom: Map.DEFAULT_ZOOM,
      tilt: 30,
      minZoom: 15,
      maxZoom: Map.MAX_EXTRA_ZOOM,
      tileSource: Map.TILE_SOURCE
    });

    this.osmb = new OSMBuildings({
      baseURL: 'js/OSMBuildings',
      minZoom: 15,
      maxZoom: Map.MAX_EXTRA_ZOOM,
      optimize: 'performance',
      attribution: '© Data <a href="http://openstreetmap.org/copyright/">OpenStreetMap</a> · © Map <a href="http://mapbox.com">MapBox</a> · © 3D <a href="http://osmbuildings.org/copyright/">OSM Buildings</a>'
    }).addTo(this.engine);

    this.osmb.addMapTiles('http://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png');
    this.osmb.addGeoJSONTiles('http://{s}.data.qa.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json', { fixedZoom: 15 });

    this.osmb.addOBJ("file:///home/thomas/Documents/GIT/3dlh/objects/hotel_ville.obj", {latitude:49.494244, longitude:0.1072428})

    this.engine.on('pointermove', this._onPointerMove = function(e) {
      var id = this.osmb.getTarget(e.x, e.y);
      if (id) {
        document.body.style.cursor = 'pointer';
        this.osmb.highlight(id, '#f08000');
        console.log(id)
      } else {
        document.body.style.cursor = 'default';
        this.osmb.highlight(null);  }
    }.bind(this));
  };

  constructor.prototype.getState = function() {
    var state = {};
    var position = this.engine.getPosition();

    state.lat = position.latitude.toFixed(5);
    state.lon = position.longitude.toFixed(5);
    state.zoom = this.engine.getZoom().toFixed(1);

    var rotation = Math.round(this.engine.getRotation());
    if (rotation) {
      state.rotation = rotation;
    }

    var tilt = Math.round(this.engine.getTilt());
    if (tilt) {
      state.tilt = tilt;
    }

    return state;
  };

  constructor.prototype.setState = function(state) {
    state.lat = state.lat !== undefined ? parseFloat(state.lat) : Map.DEFAULT_LAT;
    state.lon = state.lon !== undefined ? parseFloat(state.lon) : Map.DEFAULT_LON;
    state.zoom = state.zoom ? Math.max(Math.min(parseInt(state.zoom, 10), Map.MAX_EXTRA_ZOOM), 0) : Map.DEFAULT_ZOOM;

    state.rotation = state.rotation !== undefined ? parseFloat(state.rotation) : 0;
    state.tilt = state.tilt !== undefined ? parseFloat(state.tilt) : 30;

    this.engine.setPosition({ latitude: state.lat, longitude: state.lon });
    this.engine.setZoom(state.zoom);
    this.engine.setRotation(state.rotation);
    this.engine.setTilt(state.tilt);
  };

  constructor.prototype.destroy = function() {
    this.engine.off('pointermove', this._onPointerMove);
    this.engine.removeLayer(this.osmb);
    if (this.osmb.destroy) {
      this.osmb.destroy();
    }
    this.osmb = null;

    if (this.engine.destroy) {
      this.engine.destroy();
    }
    this.engine = null;

    this.container.innerHTML = '';
  };

  return constructor;

}());
