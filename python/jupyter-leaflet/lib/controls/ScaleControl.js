// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
export class LeafletScaleControlModel extends LeafletControlModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletScaleControlView',
            _model_name: 'LeafletScaleControlModel',
        };
    }
}
export class LeafletScaleControlView extends LeafletControlView {
    initialize(parameters) {
        super.initialize(parameters);
        this.map_view = this.options.map_view;
    }
    create_obj() {
        this.obj = L.control.scale(this.get_options());
    }
}
//# sourceMappingURL=ScaleControl.js.map