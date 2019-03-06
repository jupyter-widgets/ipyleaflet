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
    /*
    // Returns `true` if a particular event type has any listeners attached to it.
	listens: function (type, propagate) {
		var listeners = this._events && this._events[type];
		if (listeners && listeners.length) { return true; }

		if (propagate) {
			// also check parents for listeners if event propagates
			for (var id in this._eventParents) {
				if (this._eventParents[id].listens(type, propagate)) { return true; }
			}
		}
		return false;
    },


    fire: function (type, data, propagate) {
		if (!this.listens(type, propagate)) { return this; }

		var event = Util.extend({}, data, {
			type: type,
			target: this,
			sourceTarget: data && data.sourceTarget || this
		});

		if (this._events) {
			var listeners = this._events[type];

			if (listeners) {
				this._firingCount = (this._firingCount + 1) || 1;
				for (var i = 0, len = listeners.length; i < len; i++) {
					var l = listeners[i];
					l.fn.call(l.ctx || this, event);
				}

				this._firingCount--;
			}
		}

		if (propagate) {
			// propagate the event to parents (set with addEventParent)
			this._propagateEvent(event);
		}

		return this;
    },
    */
    _updateContent: function () {

		if (!this._content) { return; }
        /*
        var prefix = 'leaflet-control',
        	className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');
        this._contentNode = L.DomUtil.create('div', className);

        var node = this._contentNode;
        */

		//var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;
        var node = this._container
        var content = this._content;
		while (node.hasChildNodes()) {
			node.removeChild(node.firstChild);
		}
		node.appendChild(content);

		//this.fire('contentupdate');
    },

    update: function () {
		if (!this._map) { return; }

		//this._container.style.visibility = 'hidden';

		this._updateContent();
		//this._updateLayout();
		//this._updatePosition();

		//this._container.style.visibility = '';

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
        this._container = container ;
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
