var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;


L.Control.WidgetControl = L.Control.extend({
    options: {
        position: 'topleft',
        title: {
            'false': 'View WidgetControl',
            'true': 'Exit WidgetControl'
        }
    },

    _updateContent: function () {
		if (!this._content) { return; }
        debugger;
		var node = this._contentNode;
		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

		if (typeof content === 'string') {
			node.innerHTML = content;
		} else {
			while (node.hasChildNodes()) {
				node.removeChild(node.firstChild);
			}
			node.appendChild(content);
		}
		this.fire('contentupdate');
    },

    update: function () {
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		//this._updateLayout();
		//this._updatePosition();

		this._container.style.visibility = '';

		//this._adjustPan();
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
        var container = L.DomUtil.create('div', 'leaflet-control');
        return container;
    },
});

L.control.widget = function (options) {
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
    },

    create_obj: function () {
        this.obj = L.control.widget();
        this.create_child_view(this.model.get('widget')).then((view)=>{
            this.obj.setContent(view.el)
        })
    },

});

module.exports = {
  LeafletWidgetControlView : LeafletWidgetControlView,
  LeafletWidgetControlModel : LeafletWidgetControlModel,
};
