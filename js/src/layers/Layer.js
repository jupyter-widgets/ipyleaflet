var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('leaflet');
var utils = require('../utils.js')

//Model

// Layer

var LeafletLayerModel = widgets.WidgetModel.extend({
    defaults: _.extend({}, widgets.WidgetModel.prototype.defaults, {
        _view_name : 'LeafletLayerView',
        _model_name : 'LeafletLayerModel',
        _view_module : 'jupyter-leaflet',
        _model_module : 'jupyter-leaflet',
        opacity : 1.0,
        bottom : false,
        options : [],
        name : '',
        base : false,
        popup: null,
        popup_min_width: 400,
        popup_max_height: 400,
    })
}, {
    serializers: _.extend({
        popup: { deserialize: widgets.unpack_models }
    }, widgets.WidgetModel.serializers)
});

//UILayer

var LeafletUILayerModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletUILayerView',
        _model_name : 'LeafletUILayerModel'
    })
});


// View


var LeafletLayerView = utils.LeafletWidgetView.extend({

    initialize: function (parameters) {
        LeafletLayerView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
        this.popup_content_promise = Promise.resolve();
    },

    render: function () {
        this.create_obj();
        this.leaflet_events();
        this.model_events();

        this.bind_popup(this.model.get('popup'));
        this.listenTo(this.model, 'change:popup', function(model, value) {
            this.bind_popup(value);
        });

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
        }
    },

    leaflet_events: function () {
    },

    model_events: function () {
        this.listenTo(this.model, 'change:popup_min_width', this.update_popup, this);
        this.listenTo(this.model, 'change:popup_max_height', this.update_popup, this);
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
                    that.obj.bindPopup(view.el, that.popup_options());

                    // Trigger the displayed event of the child view.
                    that.displayed.then(function() {
                        view.trigger('displayed', that);
                    });

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


// UILayer
var LeafletUILayerView = LeafletLayerView.extend({
});



module.exports = {
  //views
  LeafletLayerView : LeafletLayerView,
  LeafletUILayerView : LeafletUILayerView,
  //models
  LeafletLayerModel : LeafletLayerModel,
  LeafletUILayerModel : LeafletUILayerModel,

};
