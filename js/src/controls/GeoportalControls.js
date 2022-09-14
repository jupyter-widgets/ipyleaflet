// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const control = require('../controls/Control.js');


export class LeafletGeoportalLayerSwitcherModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletGeoportalLayerSwitcherView',
      _model_name: 'LeafletGeoportalLayerSwitcherModel',
      position : "topright",
      collapsed : false,
      layers : []
      };
    }
  }

  export class LeafletGeoportalLayerSwitcherView extends control.LeafletControlView {
    initialize(parameters) {
      super.initialize(parameters);
      this.map_view = this.options.map_view;
    }
    create_obj() {
      this.obj = L.geoportalControl.LayerSwitcher(this.get_options())
    }
  }

  export class LeafletGeoportalSearchEngineModel extends control.LeafletControlModel {
    defaults() {
      return {
        ...super.defaults(),
        _view_name: 'LeafletGeoportalSearchEngineView',
        _model_name: 'LeafletGeoportalSearchEngineModel',
        apiKey : 'essentiels',
        position : 'topleft',
        collapsed : true,
        zoomTo : 'auto',
        displayInfo : true,
        displayAdvancedSearch : true,
        resources : ["PositionOfInterest", "StreetAddress"],
        advancedSearch : {},
        geocodeOptions : {},
        autocompleteOptions : {}
        };
      }
    }

    export class LeafletGeoportalSearchEngineView extends control.LeafletControlView {
      initialize(parameters) {
        super.initialize(parameters);
        this.map_view = this.options.map_view;
      }
      create_obj() {
        this.obj = L.geoportalControl.SearchEngine(this.get_options())
      }
    }

    export class LeafletGeoportalRouteModel extends control.LeafletControlModel {
      defaults() {
        return {
          ...super.defaults(),
          _view_name: 'LeafletGeoportalRouteView',
          _model_name: 'LeafletGeoportalRouteModel',
          apiKey : 'essentiels',
          position : "bottomleft",
          collapsed : true,
          ssl : true,
          disableReverse : false,
          exclusions : {"toll" : true,
                        "bridge" : false,
                        "tunnel" : true
                      },
          graphs : ['Pieton', 'Voiture'],
          autocompleteOptions : {},
          routeOptions : {}
          };
        }
      }

      export class LeafletGeoportalRouteView extends control.LeafletControlView {
        initialize(parameters) {
          super.initialize(parameters);
          this.map_view = this.options.map_view;
        }
        create_obj() {
          this.obj = L.geoportalControl.Route(this.get_options())
        }
      }

      export class LeafletGeoportalMousePositionModel extends control.LeafletControlModel {
        defaults() {
          return {
            ...super.defaults(),
            _view_name: 'LeafletGeoportalMousePositionView',
            _model_name: 'LeafletGeoportalMousePositionModel',
            apiKey : 'essentiels',
            position : 'bottomleft',
            collapsed : false,
            displayAltitude : false,
            displayCoordinates : true,
            editCoordinates : true,
            altitude : {},
            systems : [],
            units : []
            };
          }
        }

        export class LeafletGeoportalMousePositionView extends control.LeafletControlView {
          initialize(parameters) {
            super.initialize(parameters);
            this.map_view = this.options.map_view;
          }
          create_obj() {
            this.obj = L.geoportalControl.MousePosition(this.get_options())
          }
        }

        export class LeafletGeoportalElevationPathModel extends control.LeafletControlModel {
          defaults() {
            return {
              ...super.defaults(),
              _view_name: 'LeafletGeoportalElevationPathView',
              _model_name: 'LeafletGeoportalElevationPathModel',
              apiKey : 'essentiels',
              position : 'bottomleft',
              openssl : true,
              active : false,
              stylesOptions : 'DEFAULT_STYLES',
              elevationPathOptions: {},
              displayProfileOptions : {},
              };
            }
          }

          export class LeafletGeoportalElevationPathView extends control.LeafletControlView {
            initialize(parameters) {
              super.initialize(parameters);
              this.map_view = this.options.map_view;
            }
            create_obj() {
              this.obj = L.geoportalControl.ElevationPath(this.get_options())
            }
          }

          export class LeafletGeoportalIsocurveModel extends control.LeafletControlModel {
            defaults() {
              return {
                ...super.defaults(),
                _view_name: 'LeafletGeoportalIsocurve',
                _model_name: 'LeafletGeoportalIsocurveModel',
                apiKey : 'essentiels',
                collapsed : false,
                methods : ["time", "distance"],
                exclusions : {
                     toll : true,
                     bridge : false,
                     tunnel : true
                  },
                graphs : ["Pieton", "Voiture"],
                isocurveOptions : {},
                autocompleteOptions : {}

              }
            }
          }

            export class LeafletGeoportalIsocurveView extends control.LeafletControlView {
              initialize(parameters) {
                super.initialize(parameters);
                this.map_view = this.options.map_view;
              }
              create_obj() {
                this.obj = L.geoportalControl.Isocurve(this.get_options())
              }
            }
