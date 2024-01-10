// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { getProjection } from '../projections';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export class LeafletImageServiceModel extends LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletImageServiceView',
            _model_name: 'LeafletImageServiceModel',
            url: '',
            f: 'image',
            format: 'jpgpng',
            pixelType: 'UNKNOWN',
            noData: [],
            noDataInterpretation: '',
            interpolation: '',
            compressionQuality: '',
            bandIds: [],
            time: [],
            renderingRule: {},
            mosaicRule: {},
            endpoint: '',
            attribution: '',
            crs: null,
            interactive: false,
            updateInterval: 200,
        };
    }
}
export class LeafletImageServiceView extends LeafletLayerView {
    create_obj() {
        const options = {
            ...this.get_options(),
            url: this.model.get('url'),
            crs: getProjection(this.model.get('crs')),
        };
        this.obj = L.imageService(options);
    }
    model_events() {
        super.model_events();
        this.model.on('change:url', () => {
            this.obj.update();
        });
        for (let option in this.get_options()) {
            this.model.on('change:' + option, () => {
                this.obj.update();
            });
        }
    }
}
//# sourceMappingURL=ImageService.js.map