var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('leaflet');
require('Layer.js');


// Model

var LeafletPopupModel = LeafletUILayerModel.extend({
    defaults: _.extend({}, LeafletUILayerModel.prototype.defaults, {
         _view_name : 'LeafletPopupView',
         _model_name : 'LeafletPopupModel',
        location: def_loc,
        child: null
    })
}, {
    serializers: _.extend({
        child: { deserialize: widgets.unpack_models }
    }, LeafletUILayerModel.serializers)
});


// View

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
        var that = this;
        var child_view = this.set_child(this.model.get('child'));
        this.listenTo(this.model, 'change:child', function(model, value) {
            this.set_child(value);
        });
        this.listenTo(this.model, 'change:min_width', this.update_popup, this);
        this.listenTo(this.model, 'change:max_height', this.update_popup, this);
        return child_view;
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
                    that.obj.setContent(view.el);

                    // Trigger the displayed event of the child view.
                    that.displayed.then(function() {
                        view.trigger('displayed', that);
                    });

                    that.child = view;
                    that.trigger('child:created');
                });
            });
        }
        return this.child_promise;
    },

    model_events: function () {
        LeafletPopupView.__super__.model_events.apply(this, arguments);
        this.obj.on('add', (event) => {
            // This is a workaround for making maps rendered correctly in popups
            window.dispatchEvent(new Event('resize'));
        });
    },

    update_popup: function () {
        L.setOptions(this.obj, this.get_options());

        // Enforce the options update
        if (this.map_view.obj.hasLayer(this.obj)) {
            this.map_view.obj.closePopup(this.obj);
            this.map_view.obj.openPopup(this.obj);
        }
        else {
            this.map_view.obj.openPopup(this.obj);
            this.map_view.obj.closePopup(this.obj);
        }
    }
});

module.exports = {
  //views
  LeafletPopupView : LeafletPopupView,

  //models
  LeafletPopupModel : LeafletPopupModel,
};
