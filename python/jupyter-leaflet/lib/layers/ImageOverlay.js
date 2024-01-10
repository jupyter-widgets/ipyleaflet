// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletRasterLayerModel, LeafletRasterLayerView } from './RasterLayer';
const DEFAULT_LOCATION = [0.0, 0.0];
export class LeafletImageOverlayModel extends LeafletRasterLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletImageOverlayView',
            _model_name: 'LeafletImageOverlayModel',
            url: '',
            bounds: [DEFAULT_LOCATION, DEFAULT_LOCATION],
            attribution: '',
        };
    }
}
export class LeafletImageOverlayView extends LeafletRasterLayerView {
    create_obj() {
        this.obj = L.imageOverlay(this.model.get('url'), this.model.get('bounds'), this.get_options());
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:url', () => {
            const url = this.model.get('url');
            this.obj.setUrl(url);
        });
        this.listenTo(this.model, 'change:bounds', () => {
            const bounds = this.model.get('bounds');
            this.obj.setBounds(bounds);
        });
    }
}
//# sourceMappingURL=ImageOverlay.js.map