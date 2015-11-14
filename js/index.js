var menu, menuToggle, search, map;
var WIDTH_LIMIT = 800;

document.addEventListener('DOMContentLoaded', function() {

  map = new Map(document.getElementById('map-classic'), document.getElementById('map-modern'));
  map.on('interaction', function() {
    if (innerWidth > WIDTH_LIMIT) {
      hideMenu();
    }
  });
});
