var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

L.Control.WidgetControl = L.Control.extend({
    options: {
        position: 'topleft',
        widget : 'null',
    },

    _updateContent: function () {
        if (!this._content) { return; }
        var node = this._container
        L.DomEvent.disableClickPropagation(node);
        L.DomEvent.disableScrollPropagation(node);
        var content = this._content;
        node.appendChild(content);
    },

    update: function () {
        if (!this._map) { return; }
        this._updateContent();
    },

    getContent: function(){
        return this._content;
    },

    setContent: function(content){
        this._content = content;
        this.update();
        return this;
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-widgetcontrol');
        this._container = container ;
        return container;
    },
});

L.control.widgetcontrol = function (options) {
    return new L.Control.WidgetControl(options);
};


var LeafletWidgetControlModel = LeafletControlModel.extend({
    defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name : 'LeafletWidgetControlView',
        _model_name : 'LeafletWidgetControlModel',
        widget: null,
        position: 'topleft'
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

    set_widget: function(value){
        if (this.widget_view){
            this.widget_view.remove();
        }
        if (value){
            return this.create_child_view(value).then((view)=>{
                this.widget_view = view;
                this.obj.setContent(view.el)
            })
        }
    },

    create_obj: function () {
        this.obj = L.control.widgetcontrol(this.get_options());
        this.set_widget(this.model.get('widget'));
        this.listenTo(this.model, 'change:widget', function(model){
            this.set_widget(this.model.get('widget'));
        });
    },
});

module.exports = {
  LeafletWidgetControlView : LeafletWidgetControlView,
  LeafletWidgetControlModel : LeafletWidgetControlModel,
};
