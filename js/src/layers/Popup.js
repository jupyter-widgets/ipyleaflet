// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layer = require('./Layer.js');
var PMessaging = require('@phosphor/messaging');
var PWidgets = require('@phosphor/widgets');
var LeafletUILayerView = layer.LeafletUILayerView;
var LeafletUILayerModel = layer.LeafletUILayerModel;
var def_loc = [0.0, 0.0];

var LeafletPopupModel = LeafletUILayerModel.extend({
    defaults: _.extend({}, LeafletUILayerModel.prototype.defaults, {
        _view_name: 'LeafletPopupView',
        _model_name: 'LeafletPopupModel',
        location: def_loc,
        child: null,
        min_width: 50,
        max_width: 300,
        max_height: null,
    })
}, {
    serializers: _.extend({
        child: { deserialize: widgets.unpack_models }
    }, LeafletUILayerModel.serializers)
});

var LeafletPopupView = LeafletUILayerView.extend({
    create_obj: function () {
        this.obj = L.popup(this.get_options())
            .setLatLng(this.model.get('location'));
    },

    initialize: function() {
        // Public constructor
        LeafletPopupView.__super__.initialize.apply(this, arguments);
        this.child_promise = Promise.resolve();
    },

    render: function() {
        LeafletPopupView.__super__.render.apply(this, arguments);
        return this.set_child(this.model.get('child'));
    },

    remove: function() {
        LeafletPopupView.__super__.remove.apply(this, arguments);
        var that = this;
        this.child_promise.then(function() {
            if (that.child) {
                that.child.remove();
            }
        });
    },

    set_child: function(value) {
        if (this.child) {
            this.child.remove();
        }
        if (value) {
            var that = this;
            this.child_promise = this.child_promise.then(function() {
                return that.create_child_view(value).then(function(view) {
                    PMessaging.MessageLoop.sendMessage(view.pWidget, PWidgets.Widget.Msg.BeforeAttach);
                    that.obj.setContent(view.el);
                    PMessaging.MessageLoop.sendMessage(view.pWidget, PWidgets.Widget.Msg.AfterAttach);
                    that.force_update();
                    that.child = view;
                    that.trigger('child:created');
                });
            });
        }
        return this.child_promise;
    },

    leaflet_events: function () {
        LeafletPopupView.__super__.leaflet_events.apply(this, arguments);
        this.obj.on('add', (event) => {
            // This is a workaround for making maps rendered correctly in popups
            window.dispatchEvent(new Event('resize'));
        });
    },

    model_events: function () {
        LeafletPopupView.__super__.model_events.apply(this, arguments);
        this.model.on('change:child', () => {
            this.set_child(this.model.get('child'));
        });
        this.model.on_some_change(['min_width', 'max_width', 'max_height'], this.update_popup, this);
    },

    update_popup: function () {
        L.setOptions(this.obj, this.get_options());
        this.force_update();
    },

    force_update: function () {
        // This is a workaround for enforcing the options update
        if (this.map_view.obj.hasLayer(this.obj)) {
            this.map_view.obj.closePopup(this.obj);
            this.map_view.obj.openPopup(this.obj);
        } else {
            this.map_view.obj.openPopup(this.obj);
            this.map_view.obj.closePopup(this.obj);
        }
    }
});

module.exports = {
    LeafletPopupView: LeafletPopupView,
    LeafletPopupModel: LeafletPopupModel,
};
