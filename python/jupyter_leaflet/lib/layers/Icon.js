// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView } from './Layer';
export class LeafletIconModel extends LeafletUILayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletIconView',
            _model_name: 'LeafletIconModel',
            icon_url: '',
            shadow_url: '',
            icon_size: null,
            shadow_size: null,
            icon_anchor: null,
            shadow_anchor: null,
            popup_anchor: [0, 0],
        };
    }
}
export class LeafletIconView extends LeafletUILayerView {
    create_obj() {
        this.obj = L.icon(this.get_options());
    }
}
//# sourceMappingURL=Icon.js.map