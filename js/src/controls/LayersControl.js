var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

var LeafletLayersControlModel = LeafletControlModel.extend({
  defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name: 'LeafletLayersControlView',
        _model_name: 'LeafletLayersControlModel',
        
        selected_base: '',
        selected_overlays: []
    })
});

var LeafletLayersControlView = LeafletControlView.extend({
    /**
     *
     * Core leaflet layers control maintains its own list of layers internally
     * causing issues when the layers of the underlying map changes
     * exogeneously, for example from a model change.
     *
     * For this reason, upon change of the underlying list of layers, we
     * destroy the layers control object and create a new one.
     */

    initialize: function (parameters) {
        LeafletLayersControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    toggle_obj: function () {
        this.obj.remove();
        delete this.obj;
        this.create_obj();
    },

    model_events: function (){
      var that = this;
      this.listenTo(this.map_view.model, 'change:layers', function() {
          that.toggle_obj();
      });
    },

    create_obj: function () {
        var that = this;

        that.map_view.obj.on("overlayadd", function(event){
            var sel = that.model.get('selected_overlays');
            var pos = sel.indexOf(event.name);
            if(pos == -1){
                sel.push(event.name);
                that.model.set('selected_overlays', sel);
            }
        });

        that.map_view.obj.on("overlayremove", function(event){
            var sel = that.model.get('selected_overlays');
            var pos = sel.indexOf(event.name);
            if(pos != -1){
                sel.splice(pos, 1);
                that.model.set('selected_overlays', sel);
            }
        });

        that.map_view.obj.on("baselayerchange", function(event){
            that.model.set('selected_base', event.name);
        });

        return Promise.all(this.map_view.layer_views.views).then(function(views) {
            var baselayers = views.reduce(function (ov, view) {
                if (view.model.get("base"))
                {
                    ov[view.model.get("name")] = view.obj;
                }
                return ov;
            }, {});

            var sel = that.model.get('selected_overlays');
            var overlays = views.reduce(function (ov, view) {
                if (!(view.model.get("base")))
                {
                    var name = view.model.get("name");
                    ov[name] = view.obj;

                    var pos = sel.indexOf(name);
                    if(pos == -1){
                        sel.push(name);
                    }
                }
                return ov;
            }, {});
            that.model.set('selected_overlays', sel);
            that.obj = L.control.layers(baselayers, overlays);
            return that;
        }).then(function() {
               that.obj.addTo(that.map_view.obj);
        });
    }
});

module.exports = {
  LeafletLayersControlView : LeafletLayersControlView,
  LeafletLayersControlModel : LeafletLayersControlModel,
};
