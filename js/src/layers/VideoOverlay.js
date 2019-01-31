var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js')
var rasterlayer = require('./RasterLayer.js');
var LeafletRasterLayerView = rasterlayer.LeafletRasterLayerView;
var LeafletRasterLayerModel = rasterlayer.LeafletRasterLayerModel;
var def_loc = [0.0, 0.0];

var LeafletVideoOverlayModel = LeafletRasterLayerModel.extend({
    defaults: _.extend({}, LeafletRasterLayerModel.prototype.defaults, {
        _view_name : 'LeafletVideoOverlayView',
        _model_name : 'LeafletVideoOverlayModel',

        url : '',
        bounds : [def_loc, def_loc],
        attribution : ''
    })
});
var LeafletVideoOverlayView = LeafletRasterLayerView.extend({

    create_obj: function () {
        this.obj = L.videoOverlay(
            this.model.get('url'),
            this.model.get('bounds'),
            this.get_options()
        );
        var that = this;
        this.obj.on('load', function () {
            var MyPauseControl = L.Control.extend({
                onAdd: function() {
                    var button = L.DomUtil.create('button');
                    button.innerHTML = '&#10074&#10074';
                    L.DomEvent.on(button, 'click', function () {
                        that.obj.getElement().pause();
                    });
                    return button;
                }
            });
            var MyPlayControl = L.Control.extend({
                onAdd: function() {
                    var button = L.DomUtil.create('button');
                    button.innerHTML = '&#9658';
                    L.DomEvent.on(button, 'click', function () {
                        that.obj.getElement().play();
                    });
                    return button;
                }
            });

            var pauseControl = (new MyPauseControl()).addTo(that.map_view.obj);
            var playControl = (new MyPlayControl()).addTo(that.map_view.obj);
        });
    },

    model_events: function () {
        LeafletVideoOverlayView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:url', function () {
            url = this.model.get('url');
            bounds = this.model.get('bounds');
            options = this.get_options();
            this.map_view.obj.removeLayer(this.obj);
            this.obj = L.videoOverlay(url, bounds, options);
            this.map_view.obj.addLayer(this.obj);
        }, this);

        this.listenTo(this.model, 'change:bounds', function () {
            url = this.model.get('url');
            bounds = this.model.get('bounds');
            options = this.get_options();
            this.map_view.obj.removeLayer(this.obj);
            this.obj = L.videoOverlay(url, bounds, options);
            this.map_view.obj.addLayer(this.obj);
        }, this);
    },
});
module.exports = {
  LeafletVideoOverlayView : LeafletVideoOverlayView,
  LeafletVideoOverlayModel : LeafletVideoOverlayModel,
};
