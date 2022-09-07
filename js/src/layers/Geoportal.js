// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const layer = require('./TileLayer.js');
const control = require('../controls/Control.js');
const utils = require('../utils');

export class LeafletGeoportalWMTSModel extends layer.LeafletTileLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletGeoportalWMTSView',
      _model_name: 'LeafletGeoportalWMTSModel',
      layer : 'ORTHOIMAGERY.ORTHOPHOTOS',
      apiKey : 'essentiels',
      format : 'image/jpeg'
    };
  }
}

export class LeafletGeoportalWMTSView extends layer.LeafletTileLayerView {
  create_obj() {
    this.obj = L.geoportalLayer.WMTS({layer : this.model.get('layer'), apiKey : this.model.get('api_key')}, {format : this.model.get('format')})
  }
}

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
        _model_name: 'LeafletGeoportalSearchEngineModel'
        };
      }
    }

    export class LeafletGeoportalSearchEngineView extends control.LeafletControlView {
      initialize(parameters) {
        super.initialize(parameters);
        this.map_view = this.options.map_view;
      }
      create_obj() {
        this.obj = L.geoportalControl.SearchEngine({position : "bottomleft"})
      }
    }

    export class LeafletGeoportalRouteModel extends control.LeafletControlModel {
      defaults() {
        return {
          ...super.defaults(),
         _view_name: 'LeafletGeoportalLayerSwitcherView',
          _model_name: 'LeafletGeoportalLayerSwitcherModel'
          };
        }
      }

      export class LeafletGeoportalRouteView extends control.LeafletControlView {
        initialize(parameters) {
          super.initialize(parameters);
          this.map_view = this.options.map_view;
        }
        create_obj() {
          this.obj = L.geoportalControl.Route({})
        }
      }

      export class LeafletGeoportalMousePositionModel extends control.LeafletControlModel {
        defaults() {
          return {
            ...super.defaults(),
           _view_name: 'LeafletGeoportalMousePositionView',
            _model_name: 'LeafletGeoportalMousePositionModel'
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


