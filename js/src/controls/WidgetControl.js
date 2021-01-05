// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const control = require('./Control.js');
const PMessaging = require('@lumino/messaging');
const PWidgets = require('@lumino/widgets');

class WidgetControl extends L.Control {
  updateLayout(options) {
    if (!this._container) {
      return;
    }
    Object.keys(options).forEach(option => {
      this._container.style[option] = options[option] + 'px';
    });
  }

  getContent() {
    return this._content;
  }

  setContent(content) {
    if (!this._map) {
      return;
    }

    this._content = content;
    this._container.appendChild(this._content);

    return this;
  }

  onAdd(map) {
    if(this.options.transparentBg)
      this._container = L.DomUtil.create('div');
    else
      this._container = L.DomUtil.create('div', 'leaflet-widgetcontrol');

    L.DomEvent.disableClickPropagation(this._container);
    L.DomEvent.disableScrollPropagation(this._container);

    return this._container;
  }
}

L.Control.WidgetControl = WidgetControl;

L.control.widgetcontrol = function(options) {
  return new L.Control.WidgetControl(options);
};

export class LeafletWidgetControlModel extends control.LeafletControlModel {
  defaults() {
    return {
      _view_name: 'LeafletWidgetControlView',
      _model_name: 'LeafletWidgetControlModel',
      widget: null,
      max_width: null,
      min_width: null,
      max_height: null,
      min_height: null,
      transparent_bg: false,
    };
  }
}

LeafletWidgetControlModel.serializers = {
  ...control.LeafletControlModel.serializers,
  widget: { deserialize: widgets.unpack_models }
};

export class LeafletWidgetControlView extends control.LeafletControlView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
    this.widget_view = undefined;
  }

  set_widget(widget_model) {
    if (this.widget_view) {
      this.widget_view.remove();
      this.widget_view = undefined;
    }
    if (widget_model) {
      return this.create_child_view(widget_model).then(view => {
        this.widget_view = view;
        // Trigger the displayed event of the child view.
        this.displayed.then(() => {
          this.widget_view.trigger('displayed', this);
          this.widget_view.displayed.then(() => {
            this.updateLayout();
            PMessaging.MessageLoop.sendMessage(
              view.pWidget,
              PWidgets.Widget.Msg.BeforeAttach
            );
            this.obj.setContent(view.el);
            PMessaging.MessageLoop.sendMessage(
              view.pWidget,
              PWidgets.Widget.Msg.AfterAttach
            );
          });
        });
      });
    }
  }

  create_obj() {
    this.obj = L.control.widgetcontrol(this.get_options());
    this.set_widget(this.model.get('widget'));
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:min_width change:min_height change:max_width change:max_height',
      () => {
        this.updateLayout();
      }
    );
    this.listenTo(this.model, 'change:widget', function(model) {
      this.set_widget(this.model.get('widget'));
    });
  }

  updateLayout() {
    this.obj.updateLayout({
      maxWidth: this.model.get('max_width'),
      minWidth: this.model.get('min_width'),
      maxHeight: this.model.get('max_height'),
      minHeight: this.model.get('min_height')
    });
  }
}
