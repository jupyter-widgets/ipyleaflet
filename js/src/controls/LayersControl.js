// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const control = require('./Control.js');

export class LeafletLayersControlModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletLayersControlView',
      _model_name: 'LeafletLayersControlModel',
      selected_base: '',
      selected_overlays: []
    };
  }
}

export class LeafletLayersControlView extends control.LeafletControlView {
  /**
   * Core leaflet layers control maintains its own list of layers internally
   * causing issues when the layers of the underlying map changes
   * exogeneously, for example from a model change.
   *
   * For this reason, upon change of the underlying list of layers, we
   * destroy the layers control object and create a new one.
   */

  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;

    this.map_view.obj.on("overlayadd", (event) => {
        var sel = this.model.get('selected_overlays');
        var pos = sel.indexOf(event.name);

        if(pos == -1) {
            // Make a copy of the list so that backbone sees the change
            sel = [...sel];
            sel.push(event.name);

            this.model.set('selected_overlays', sel);
            this.touch();
        }
    });

    this.map_view.obj.on("overlayremove", (event) => {
        var sel = this.model.get('selected_overlays');
        var pos = sel.indexOf(event.name);

        if(pos != -1) {
            // Make a copy of the list so that backbone sees the change
            sel = [...sel];
            sel.splice(pos, 1);

            this.model.set('selected_overlays', sel);
            this.touch();
        }
    });

    this.map_view.obj.on("baselayerchange", (event) => {
        this.model.set('selected_base', event.name);
        this.touch();
    });

    this.initializeSelectedAttributes();
  }

  toggle_obj() {
    this.obj.remove();
    delete this.obj;
    this.create_obj();
  }

  model_events() {
    this.listenTo(this.map_view.model, 'change:layers', () => {
      this.toggle_obj();
    });
  }

  create_obj() {
    return Promise.all(this.map_view.layer_views.views)
      .then(views => {
        var baselayers = views.reduce(function(ov, view) {
          if (view.model.get('base')) {
            ov[view.model.get('name')] = view.obj;
          }
          return ov;
        }, {});
        var selection = [...this.model.get('selected_overlays')];
        var overlays = views.reduce(function(ov, view) {
          if (!view.model.get('base')) {
            var name = view.model.get("name");
            ov[name] = view.obj;
            if (!selection.includes(name)) {
              selection.push(name);
            }
          }
          return ov;
        }, {});
        this.model.set('selected_overlays', selection);
        this.touch();
        this.obj = L.control.layers(baselayers, overlays, this.get_options());
        return this;
      })
      .then(() => {
        this.obj.addTo(this.map_view.obj);
      });
  }

  initializeSelectedAttributes() {
      var layers = this.map_view.model.get('layers');

      var baselayerNames = layers.reduce((baseLayerNames, layer) => {
          if (layer.get("base")) {
              baseLayerNames.push(layer.get('name'));
          }
          return baseLayerNames;
      }, []);

      var overlayNames = layers.reduce((overlayNames, layer) => {
          if (!layer.get("base")) {
              overlayNames.push(layer.get('name'));
          }
          return overlayNames;
      }, []);

      this.model.set('selected_base', baselayerNames[baselayerNames.length - 1]);
      this.model.set('selected_overlays', overlayNames);
      this.touch();
  }
}
