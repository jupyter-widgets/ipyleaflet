// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const PMessaging = require('@lumino/messaging');
const PWidgets = require('@lumino/widgets');
const L = require('../leaflet.js');
const utils = require('../utils.js');

export class LeafletLayerModel extends widgets.WidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletLayerView',
      _model_name: 'LeafletLayerModel',
      _view_module: 'jupyter-leaflet',
      _model_module: 'jupyter-leaflet',
      opacity: 1.0,
      bottom: false,
      options: [],
      name: '',
      base: false,
      popup: null,
      popup_min_width: 50,
      popup_max_width: 300,
      popup_max_height: null,
      pane: '',
      subitems: []
    };
  }
}

LeafletLayerModel.serializers = {
  ...widgets.WidgetModel.serializers,
  popup: { deserialize: widgets.unpack_models },
  subitems: { deserialize: widgets.unpack_models }
};



export class LeafletUILayerModel extends LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletUILayerView',
      _model_name: 'LeafletUILayerModel'
    };
  }
}

export class LeafletLayerView extends utils.LeafletWidgetView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
    this.popup_content_promise = Promise.resolve();
  }

  render() {
    return Promise.resolve(this.create_obj()).then(() => {
      this.leaflet_events();
      this.model_events();
      this.bind_popup(this.model.get('popup'));
      this.listenTo(this.model, 'change:popup', function(model, value) {
        this.bind_popup(value);
      });
      this.update_pane();
    });
  }

  update_pane() {
    const pane = this.model.get('pane');
    if (pane !== '') {
      L.setOptions(this.obj, {pane});
    }
  }

  leaflet_events() {
    // If the layer is interactive
    if (this.obj.on) {
      this.obj.on(
        'click dblclick mousedown mouseup mouseover mouseout',
        event => {
          this.send({
            event: 'interaction',
            type: event.type,
            coordinates: [event.latlng.lat, event.latlng.lng]
          });
        }
      );
      this.obj.on('popupopen', event => {
        // This is a workaround for making maps rendered correctly in popups
        window.dispatchEvent(new Event('resize'));
      });
      // this layer is transformable
      if (this.obj.transform) {
        // add the handler only when the layer has been added
        this.obj.on('add', () => {
          this.update_transform();
        });
        this.obj.on('transformed', () => {
          this.model.set('locations', this.obj.getLatLngs());
          this.touch();
        });
      }
    }
  }

  model_events() {
    var key;
    var o = this.model.get('options');
    for (var i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(
        this.model,
        'change:' + key,
        function() {
          L.setOptions(this.obj, this.get_options());
        },
        this
      );
    }
    this.model.on_some_change(
      ['popup_min_width', 'popup_max_width', 'popup_max_height'],
      this.update_popup,
      this
    );
    this.listenTo(
      this.model,
      'change:pane',
      function() {
        this.map_view.rerender();
      },
      this
    );
  }

  remove() {
    super.remove();
    this.popup_content_promise.then(() => {
      if (this.popup_content) {
        this.popup_content.remove();
      }
    });
  }

  bind_popup(value) {
    if (this.popup_content) {
      this.obj.unbindPopup();
      this.popup_content.remove();
    }
    if (value) {
      this.popup_content_promise = this.popup_content_promise.then(() => {
        return this
          .create_child_view(value, { map_view: this.map_view })
          .then(view => {
            // If it's a Popup widget
            if (value.name == 'LeafletPopupModel') {
              this.obj.bindPopup(view.obj, this.popup_options());
            } else {
              PMessaging.MessageLoop.sendMessage(
                view.pWidget,
                PWidgets.Widget.Msg.BeforeAttach
              );
              this.obj.bindPopup(view.el, this.popup_options());
              PMessaging.MessageLoop.sendMessage(
                view.pWidget,
                PWidgets.Widget.Msg.AfterAttach
              );
            }
            this.popup_content = view;
            this.trigger('popup_content:created');
          });
      });
    }
    return this.popup_content_promise;
  }

  popup_options() {
    return {
      minWidth: this.model.get('popup_min_width'),
      maxWidth: this.model.get('popup_max_width'),
      maxHeight: this.model.get('popup_max_height')
    };
  }

  update_popup() {
    L.setOptions(this.obj.getPopup(), this.popup_options());

    // Those TWO lines will enforce the options update
    this.obj.togglePopup();
    this.obj.togglePopup();
  }
}

export class LeafletUILayerView extends LeafletLayerView {}
