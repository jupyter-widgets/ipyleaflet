var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');

function camel_case(input) {
    // Convert from foo_bar to fooBar
    return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

var leaflet_views_common_methods = {
    get_options: function () {
        var o = this.model.get('options');
        var options = {};
        var key;
        for (var i=0; i<o.length; i++) {
            key = o[i];
            // Convert from foo_bar to fooBar that Leaflet.js uses
            options[camel_case(key)] = this.model.get(key);
        }
        return options;
    }
}

var LeafletWidgetView = widgets.WidgetView.extend(leaflet_views_common_methods);
var LeafletDOMWidgetView = widgets.DOMWidgetView.extend(leaflet_views_common_methods);

module.exports = {
  LeafletWidgetView : LeafletWidgetView,
  LeafletDOMWidgetView : LeafletDOMWidgetView,
}
