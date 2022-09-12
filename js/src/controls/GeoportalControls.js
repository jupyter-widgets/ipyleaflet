// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const control = require('../controls/Control.js');


export class LeafletGeoportalLayerSwitcherModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
     _view_name: 'LeafletGeoportalLayerSwitcherView',
      _model_name: 'LeafletGeoportalLayerSwitcherModel'
      };
    }
  }

  export class LeafletGeoportalLayerSwitcherView extends control.LeafletControlView {
    initialize(parameters) {
      super.initialize(parameters);
      this.map_view = this.options.map_view;
    }
    create_obj() {
      this.obj = L.geoportalControl.LayerSwitcher()
    }
  }

  export class LeafletGeoportalSearchEngineModel extends control.LeafletControlModel {
    defaults() {
      return {
        ...super.defaults(),
        _view_name: 'LeafletGeoportalSearchEngineView',
        _model_name: 'LeafletGeoportalSearchEngineModel',
        position : 'topleft',
        collapsed : true,
        zoomTo : 'auto',
        displayInfo : true,
        apiKey : 'cartes',
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
          position : "bottomleft",
          collapsed : true,
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
            position : 'bottomleft',
            collapsed : false,
            displayAltitude : true,
            displayCoordinates : true,
            editCoordinates : false,
            crs : '',
            label : '',
            selectedtype: '',
            altitude : {
              triggerDelay : 100,
              responseDelay : 500,
              noDataValue : -99999,
              noDataValueTolerance : 90000,
              serviceOptions : {}
           },
          systems : [
           {
              crs : L.CRS.EPSG4326,
              label : "Lon,Lat",
              selectedtype : "Geographical"
            },
           {
             crs : L.geoportalCRS.EPSG2154,
              label : "Lambert 93",
              selectedtype : "Metric"
            }
          ],
          units : ["DEC", "DMS"]

            };
          }
        }

        export class LeafletGeoportalMousePositionView extends control.LeafletControlView {
          initialize(parameters) {
            super.initialize(parameters);
            this.map_view = this.options.map_view;
          }
          create_obj() {
            this.obj = L.geoportalControl.MousePosition({})
          }
        }

        export class LeafletGeoportalElevationPathModel extends control.LeafletControlModel {
          defaults() {
            return {
              ...super.defaults(),
             _view_name: 'LeafletGeoportalElevationPathView',
              _model_name: 'LeafletGeoportalElevationPathModel'
              };
            }
          }

          export class LeafletGeoportalElevationPathView extends control.LeafletControlView {
            initialize(parameters) {
              super.initialize(parameters);
              this.map_view = this.options.map_view;
            }
            create_obj() {
              this.obj = L.geoportalControl.ElevationPath({})
            }
          }

          export class LeafletGeoportalIsocurveModel extends control.LeafletControlModel {
            defaults() {
              return {
                ...super.defaults(),
                _view_name: 'LeafletGeoportalIsocurve',
                _model_name: 'LeafletGeoportalIsocurveModel',
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




