// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// leaflet-ant-path does not have typescript definitions
//@ts-ignore
import { antPath } from 'leaflet-ant-path';
import L from '../leaflet';
import { LeafletVectorLayerModel, LeafletVectorLayerView } from './VectorLayer';
export class LeafletAntPathModel extends LeafletVectorLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletAntPathView',
            _model_name: 'LeafletAntPathModel',
            use: 'polyline',
            delay: 400,
            weight: 5,
            dash_array: [10, 20],
            color: '#0000FF',
            pulse_color: '#FFFFFF',
            paused: false,
            reverse: false,
            hardware_accelerated: false,
            radius: 10,
        };
    }
}
export class LeafletAntPathView extends LeafletVectorLayerView {
    create_obj() {
        this.obj = antPath(this.model.get('locations'), this.get_ant_options());
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:locations', () => {
            this.obj.setLatLngs(this.model.get('locations'));
        });
        this.model.on_some_change(this.model.get('options'), () => {
            this.obj.setStyle(this.get_ant_options());
        }, this);
        this.obj.setStyle(this.get_ant_options());
    }
    get_ant_options() {
        const options = this.get_options();
        if (options.use != 'circle') {
            delete options.radius;
        }
        options.use = L[options.use];
        return options;
    }
}
//# sourceMappingURL=AntPath.js.map