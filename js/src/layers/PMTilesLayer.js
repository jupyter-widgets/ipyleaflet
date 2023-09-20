// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const layer = require('./Layer.js');

export class LeafletPMTilesLayerModel extends layer.LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPMTilesLayerView',
            _model_name: 'LeafletPMTilesLayerModel',
            url: '',
            style: {},
        };
    }
}

export class LeafletPMTilesLayerView extends layer.LeafletLayerView {
    render() {
        this.create_obj();
        this.listenTo(this.model, 'change:url', this.url_changed.bind(this));
        this.listenTo(this.model, 'change:style', this.style_changed.bind(this));
    }

    create_obj() {
        var protocol = new pmtiles.Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);
        
        var mapStyle = {
            ...this.model.get('style'),
            sources: {
                ...this.model.get('style').sources,
                "pmtiles_source": {
                    "type": "vector",
                    "url": "pmtiles://" + this.model.get('url')
                }
            }
        };
        
        this.obj = L.maplibreGL({
            style: mapStyle
        });
    }

    url_changed() {
        var newUrl = "pmtiles://" + this.model.get('url');
        var currentStyle = this.obj.getStyle();
        currentStyle.sources["pmtiles_source"].url = newUrl;
        this.obj.setStyle(currentStyle);
    }

    style_changed() {
        this.obj.setStyle(this.model.get('style'));
    }
}
