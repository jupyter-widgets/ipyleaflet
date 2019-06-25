var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;
var PMessaging = require('@phosphor/messaging');
var PWidgets = require('@phosphor/widgets');

L.Control.WidgetControl = L.Control.extend({
    updateLayout: function(options) {
        if (!this._container) { return; }

        Object.keys(options).forEach((option) => {
            this._container.style[option] = options[option] + 'px';
        });
    },

    getContent: function() {
        return this._content;
    },

    setContent: function(content) {
        if (!this._map)
        {
            return;
        }

        this._content = content;
        this._container.appendChild(this._content);

        return this;
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-widgetcontrol');

        L.DomEvent.disableClickPropagation(this._container);
        L.DomEvent.disableScrollPropagation(this._container);

        return this._container;
    },
});

L.control.widgetcontrol = function (options) {
    return new L.Control.WidgetControl(options);
};


var LeafletWidgetControlModel = LeafletControlModel.extend({
    defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name: 'LeafletWidgetControlView',
        _model_name: 'LeafletWidgetControlModel',
        widget: null,
        max_width: null,
        min_width: null,
        max_height: null,
        min_height: null
    })
},  {
    serializers: _.extend({
        widget: { deserialize: widgets.unpack_models }
    }, LeafletControlModel.serializers)
});

var LeafletWidgetControlView = LeafletControlView.extend({
    initialize: function (parameters) {
        LeafletWidgetControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
        this.widget_view = undefined;
    },

    set_widget: function(widget_model){
        if (this.widget_view){
            this.widget_view.remove();
            this.widget_view = undefined;
        }
        if (widget_model){
            return this.create_child_view(widget_model).then((view)=>{
                this.widget_view = view;

                // Trigger the displayed event of the child view.
                this.displayed.then(() => {
                    this.widget_view.trigger('displayed', this);
                    this.widget_view.displayed.then(() => {
                        this.updateLayout();
                        PMessaging.MessageLoop.sendMessage(view.pWidget, PWidgets.Widget.Msg.BeforeAttach);
                        this.obj.setContent(view.el);
                        PMessaging.MessageLoop.sendMessage(view.pWidget, PWidgets.Widget.Msg.AfterAttach);
                    });
                });
            })
        }
    },

    create_obj: function () {
        this.obj = L.control.widgetcontrol(this.get_options());
        this.set_widget(this.model.get('widget'));
    },

    model_events: function () {
        LeafletWidgetControlView.__super__.model_events.apply(this, arguments);

        this.listenTo(this.model, 'change:min_width change:min_height change:max_width change:max_height', () => {
            this.updateLayout();
        });
        this.listenTo(this.model, 'change:widget', function(model){
            this.set_widget(this.model.get('widget'));
        });
    },

    updateLayout: function() {
        this.obj.updateLayout({
            maxWidth: this.model.get('max_width'),
            minWidth: this.model.get('min_width'),
            maxHeight: this.model.get('max_height'),
            minHeight: this.model.get('min_height')
        });
    }
});

module.exports = {
    LeafletWidgetControlView: LeafletWidgetControlView,
    LeafletWidgetControlModel: LeafletWidgetControlModel,
};
