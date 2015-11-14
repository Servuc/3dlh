
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


    /***/
/*
    var myDatas = [{"nom":"Maison de l'Armateur","description":"La maison de l'armateur est une maison d'architecte du 18ème siècle organisée autour d'un puits de lumière central, aujoud'hui musée emblématique de l'histoire havraise. Visites commentées.","fichier3d":"armateur.obj","Latitude":0.12038,"Longitude":49.48455,"options":{"scale":1,"rotation":0,"elevation":0,"id":"armateur"}},{"nom":"Centre classé","description":"Quartier regroupant le centre historique reconstruit par Auguste Perret et classé au patrimoine mondial de l'Unesco.","fichier3d":"centre.obj","Latitude":0.11508,"Longitude":49.48946,"options":{"scale":1,"rotation":0,"elevation":0,"id":"perret"}},{"nom":"Hôtel de ville","description":"Hôtel de ville du Havre et sa grande place.","3d":"hotel_ville.obj","Latitude":0.11547,"Longitude":49.49168,"options":{"scale":1,"rotation":0,"elevation":0,"id":"hdv"}},{"nom":"Porte Océane","description":"Ouverture architecturale vers la mer, située en bout de l'avenue Foch","fichier3d":"porte_oceane.obj","Latitude":0.10404,"Longitude":49.49125,"options":{"scale":1,"rotation":0,"elevation":0,"id":"océane"}},{"nom":"Oscar Niemeyer","description":"Site regroupant la Scène Nationale 'Le Volcan' (Musique Danse et Théatre) et la bibliothèque municipale Niemeyer","fichier3d":"oscar_niemeyer.obj","Latitude":0.11412,"Longitude":49.48824,"options":{"scale":1,"rotation":0,"elevation":0,"id":"niemeyer"}},{"nom":"MuMa","description":"Musée d'Art moderne André Malraux, présentant la plus riche collection impressionniste de province","fichier3d":"muma.obj","Latitude":0.11026,"Longitude":49.48261,"options":{"scale":1,"rotation":0,"elevation":0,"id":"muma"}},{"nom":"Muséum d'Histoire naturelle","description":"Le Muséum d’histoire naturelle du Havre propose des expositions temporaires ludiques et interactives pour découvrir et comprendre les richesses du monde animal, végétal et minéral","fichier3d":"museum.obj","Latitude":0.11664,"Longitude":49.48541,"options":{"scale":1,"rotation":0,"elevation":0,"id":"museum"}},{"nom":"Musée Dubocage de Bléville","description":"Hôtel particulier du XVIIème siècle, collections permanentes et expositions temporaires liées à l'histoire du Havre et au négoce maritime. Visite libre ou commentées","fichier3d":"musee_dubocage.obj","Latitude":0.12196,"Longitude":49.48662,"options":{"scale":1,"rotation":0,"elevation":0,"id":"dubocage"}},{"nom":"Cathédrale","description":"La cathédrale Notre-Dame du Havre est la principale église du diocèse du Havre. Mêlant styles gothique, Renaissance et baroque, il s'agit du plus ancien édifice du centre-ville reconstruit du Havre (classé au Patrimoine mondial de l’UNESCO)","fichier3d":"cathedrale.obj","Latitude":0.11591,"Longitude":49.48467,"options":{"scale":1,"rotation":0,"elevation":0,"id":"cathedrale"}},{"nom":"Eglise Saint Joseph","description":"L'église Saint-Joseph est un édifice emblématique du centre-ville reconstruit du Havre. C'est le premier monument que l'on voit en arrivant par la mer","fichier3d":"eglise_st_joseph.obj","Latitude":0.10877,"Longitude":49.48856,"options":{"scale":1,"rotation":0,"elevation":0,"id":"joseph"}},{"nom":"Abbaye de Graville","description":"Abbaye du XIᵉ siècle qui abrite aujourd'hui un musée","fichier3d":"abbaye.obj","Latitude":0.17252,"Longitude":49.5011,"options":{"scale":1,"rotation":0,"elevation":0,"id":"graville"}},{"nom":"Plage","description":"Plage du Havre","fichier3d":"plage.obj","Latitude":0.09961,"Longitude":49.49218,"options":{"scale":1,"rotation":0,"elevation":0,"id":"plage"}},{"nom":"Jardins suspendus","description":"Ce site exceptionnel, d’une surface de 10 hectares, ancien fort, surplombe la baie de Seine et offre des points de vue admirables sur la mer, le port et la ville","fichier3d":"jardins_suspendus.obj","Latitude":0.10153,"Longitude":49.50216,"options":{"scale":1,"rotation":0,"elevation":0,"id":"jardins"}},{"nom":"Forêt de Montgeon","description":"Forêt de 270 hectares située dans la vile et comprenant des lacs, une serre tropicale, une volière, une faune sauvage, et un arboretum de conifères","fichier3d":"montgeon.obj","Latitude":0.14942,"Longitude":49.51772,"options":{"scale":1,"rotation":0,"elevation":0,"id":"foret"}},{"nom":"Bassin des docks","description":"Complexe aquatique de la ville du Havre comprenant un bassin sportif de 50m en extérieur, des bassins ludiques intérieurs et extérieurs, un espace balnéo et un espace fitness","fichier3d":"bassin_docks.obj","Latitude":0.13469,"Longitude":49.4848,"options":{"scale":1,"rotation":0,"elevation":0,"id":"bassin"}},{"nom":"Stade Océane","description":"Stade multifonction de 25 000 places assises pour le sport et 33 000 places pour les spectacles","3d":"stade_oceane.obj","Latitude":0.17731,"Longitude":49.49644,"options":{"scale":1,"rotation":0,"elevation":0,"id":"stade"}}];
    /***/

  /*  for(var cpt = 0; cpt < myDatas.length; cpt++)
    {
      console.log(myDatas[cpt].Latitude);
      this.osmb.addOBJ("file:///home/thomas/Documents/GIT/3dlh/objects/" + myDatas[cpt].fichier3d, {latitude:myDatas[cpt].Latitude, longitude:myDatas[cpt].Longitude})
    }*/
    this.osmb.addOBJ("file:///var/www/3dlh/objects/test.obj", {longitude:0.12739, latitude:49.48720})
    var myInfos = [{"nom":"Maison de l'Armateur","description":"La maison de l'armateur est une maison d'architecte du 18ème siècle organisée autour d'un puits de lumière central, aujoud'hui musée emblématique de l'histoire havraise. Visites commentées.","Latitude":49.48455,"Longitude":0.11283},{"nom":"Hôtel de ville","description":"Hôtel de ville du Havre et sa grande place.","Latitude":49.49399,"Longitude":0.10831},{"nom":"Porte Océane","description":"Ouverture architecturale vers la mer, située en bout de l'avenue Foch","Latitude":49.49125,"Longitude":0.10404},{"nom":"Oscar Niemeyer","description":"Site regroupant la Scène Nationale 'Le Volcan' (Musique Danse et Théatre) et la bibliothèque municipale Niemeyer","Latitude":49.48824,"Longitude":0.11412},{"nom":"MuMa","description":"Musée d'Art moderne André Malraux, présentant la plus riche collection impressionniste de province","Latitude":49.48261,"Longitude":0.11026},{"nom":"Muséum d'Histoire naturelle","description":"Le Muséum d’histoire naturelle du Havre propose des expositions temporaires ludiques et interactives pour découvrir et comprendre les richesses du monde animal, végétal et minéral","Latitude":49.48541,"Longitude":0.11664},{"nom":"Musée Dubocage de Bléville","description":"Hôtel particulier du XVIIème siècle, collections permanentes et expositions temporaires liées à l'histoire du Havre et au négoce maritime. Visite libre ou commentées","Latitude":49.48883,"Longitude":0.11473},{"nom":"Cathédrale","description":"La cathédrale Notre-Dame du Havre est la principale église du diocèse du Havre. Mêlant styles gothique, Renaissance et baroque, il s'agit du plus ancien édifice du centre-ville reconstruit du Havre (classé au Patrimoine mondial de l’UNESCO)","Latitude":49.48467,"Longitude":0.11591},{"nom":"Jardins suspendus","description":"Ce site exceptionnel, d’une surface de 10 hectares, ancien fort, surplombe la baie de Seine et offre des points de vue admirables sur la mer, le port et la ville","Latitude":49.50216,"Longitude":0.10153},{"nom":"Forêt de Montgeon","description":"Forêt de 270 hectares située dans la vile et comprenant des lacs, une serre tropicale, une volière, une faune sauvage, et un arboretum de conifères","Latitude":49.51772,"Longitude":0.14942},{"nom":"Bassin des docks","description":"Complexe aquatique de la ville du Havre comprenant un bassin sportif de 50m en extérieur, des bassins ludiques intérieurs et extérieurs, un espace balnéo et un espace fitness","Latitude":49.48714,"Longitude":0.12729}];
    this.engine.on('pointermove', this._onPointerMove = function(e) {
      var id = this.osmb.getTarget(e.x, e.y);
      //console.log(e.x + " " + e.y)
      if (id) {
        document.body.style.cursor = 'pointer';
        this.osmb.highlight(id, '#f08000');
        //console.log(id)
      } else {
        document.body.style.cursor = 'default';
        this.osmb.highlight(null);  }

        //Test if POI is near center screen
        var myPosition = this.engine.getPosition();
        document.getElementById("infos").innerHTML = "";

        for(var cpt = 0, myIndice = 100000; cpt < myInfos.length; cpt++)
        {
          if(myInfos[cpt].Latitude - 0.004 <= myPosition.latitude && myPosition.latitude <= myInfos[cpt].Latitude + 0.004
          && myInfos[cpt].Longitude - 0.004 <= myPosition.longitude && myPosition.longitude <= myInfos[cpt].Longitude + 0.004)
          {
            console.log(myInfos[cpt].nom)
            break;
          }
        }
    }.bind(this));
  };


  constructor.prototype.setPosition = function(x, y)
  {
    this.engine.setPosition({ latitude: x, longitude: y });
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
