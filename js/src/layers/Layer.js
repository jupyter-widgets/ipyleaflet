var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var PMessaging = require('@phosphor/messaging');
var PWidgets = require('@phosphor/widgets');
var L = require('../leaflet.js');
var utils = require('../utils.js')

var LeafletLayerModel = widgets.WidgetModel.extend({
    defaults: _.extend({}, widgets.WidgetModel.prototype.defaults, {
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
    })
}, {
    serializers: _.extend({
        popup: { deserialize: widgets.unpack_models }
    }, widgets.WidgetModel.serializers)
});

var LeafletUILayerModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name: 'LeafletUILayerView',
        _model_name: 'LeafletUILayerModel'
    })
});

var LeafletLayerView = utils.LeafletWidgetView.extend({

    initialize: function (parameters) {
        LeafletLayerView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
        this.popup_content_promise = Promise.resolve();
    },

    render: function () {
        return Promise.resolve(this.create_obj()).then(() => {
            this.leaflet_events();
            this.model_events();
            this.bind_popup(this.model.get('popup'));
            this.listenTo(this.model, 'change:popup', function(model, value) {
                this.bind_popup(value);
            });
        })
    },

    leaflet_events: function () {
        // If the layer is interactive
        if (this.obj.on) {
            this.obj.on('click dblclick mousedown mouseup mouseover mouseout', (event) => {
                this.send({
                    event: 'interaction',
                    type: event.type,
                    coordinates: [event.latlng.lat, event.latlng.lng]
                });
            });
            this.obj.on('popupopen', (event) => {
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
    },

    model_events: function () {
        this.model.on_some_change(['popup_min_width', 'popup_max_width', 'popup_max_height'], this.update_popup, this);
    },

    remove: function() {
        LeafletLayerView.__super__.remove.apply(this, arguments);
        var that = this;
        this.popup_content_promise.then(function() {
            if (that.popup_content) {
                that.popup_content.remove();
            }
        });
    },

    bind_popup: function (value) {
        if (this.popup_content) {
            this.obj.unbindPopup();
            this.popup_content.remove();
        }
        if (value) {
            var that = this;
            this.popup_content_promise = this.popup_content_promise.then(function() {
                return that.create_child_view(value).then(function(view) {
                    PMessaging.MessageLoop.sendMessage(view.pWidget, PWidgets.Widget.Msg.BeforeAttach);
                    that.obj.bindPopup(view.el, that.popup_options());
                    PMessaging.MessageLoop.sendMessage(view.pWidget, PWidgets.Widget.Msg.AfterAttach);

                    that.popup_content = view;
                    that.trigger('popup_content:created');
                });
            });
        }
        return this.popup_content_promise;
    },

    popup_options: function () {
        return {
            minWidth: this.model.get('popup_min_width'),
            maxWidth: this.model.get('popup_max_width'),
            maxHeight: this.model.get('popup_max_height')
        };
    },

    update_popup: function () {
        L.setOptions(this.obj.getPopup(), this.popup_options());

        // Those TWO lines will enforce the options update
        this.obj.togglePopup();
        this.obj.togglePopup();
    }
});

var LeafletUILayerView = LeafletLayerView.extend({
});

module.exports = {
    LeafletLayerView: LeafletLayerView,
    LeafletUILayerView: LeafletUILayerView,
    LeafletLayerModel: LeafletLayerModel,
    LeafletUILayerModel: LeafletUILayerModel,
};
