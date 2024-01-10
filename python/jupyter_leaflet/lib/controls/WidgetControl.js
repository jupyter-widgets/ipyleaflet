// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { unpack_models } from '@jupyter-widgets/base';
import { MessageLoop } from '@lumino/messaging';
import { Widget } from '@lumino/widgets';
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
class WidgetControl extends L.Control {
    updateLayout(options) {
        if (!this._container) {
            return;
        }
        Object.keys(options).forEach((option) => {
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
    onAdd() {
        if (this.options.transparentBg)
            this._container = L.DomUtil.create('div');
        else
            this._container = L.DomUtil.create('div', 'leaflet-widgetcontrol');
        L.DomEvent.disableClickPropagation(this._container);
        L.DomEvent.disableScrollPropagation(this._container);
        return this._container;
    }
}
//@ts-ignore
L.Control.WidgetControl = WidgetControl;
//@ts-ignore
L.control.widgetcontrol = function (options) {
    //@ts-ignore
    return new L.Control.WidgetControl(options);
};
export class LeafletWidgetControlModel extends LeafletControlModel {
    defaults() {
        return {
            ...super.defaults(),
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
    ...LeafletControlModel.serializers,
    widget: { deserialize: unpack_models },
};
export class LeafletWidgetControlView extends LeafletControlView {
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
            return this.create_child_view(widget_model).then((view) => {
                this.widget_view = view;
                // Trigger the displayed event of the child view.
                this.displayed.then(() => {
                    this.widget_view.trigger('displayed', this);
                    this.widget_view.displayed.then(() => {
                        this.updateLayout();
                        MessageLoop.sendMessage(view.pWidget, Widget.Msg.BeforeAttach);
                        this.obj.setContent(view.el);
                        MessageLoop.sendMessage(view.pWidget, Widget.Msg.AfterAttach);
                    });
                });
            });
        }
    }
    create_obj() {
        //@ts-ignore
        this.obj = L.control.widgetcontrol(this.get_options());
        this.set_widget(this.model.get('widget'));
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:min_width change:min_height change:max_width change:max_height', () => {
            this.updateLayout();
        });
        this.listenTo(this.model, 'change:widget', () => {
            this.set_widget(this.model.get('widget'));
        });
    }
    updateLayout() {
        this.obj.updateLayout({
            maxWidth: this.model.get('max_width'),
            minWidth: this.model.get('min_width'),
            maxHeight: this.model.get('max_height'),
            minHeight: this.model.get('min_height'),
        });
    }
}
//# sourceMappingURL=WidgetControl.js.map