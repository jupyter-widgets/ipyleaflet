// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
export class LeafletFullScreenControlModel extends LeafletControlModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletFullScreenControlView',
            _model_name: 'LeafletFullScreenControlModel',
        };
    }
}
export class LeafletFullScreenControlView extends LeafletControlView {
    initialize(parameters) {
        super.initialize(parameters);
        this.map_view = this.options.map_view;
    }
    create_obj() {
        //@ts-ignore
        this.obj = L.control.fullscreen(this.get_options());
    }
}
//# sourceMappingURL=FullScreenControl.js.map