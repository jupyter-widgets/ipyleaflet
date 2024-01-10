// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
//leaflet-velocity does not have typescript definitions
import { setOptions } from 'leaflet';
import { camel_case } from '../utils';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export class LeafletVelocityModel extends LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletVelocityView',
            _model_name: 'LeafletVelocityModel',
            displayValues: true,
            displayOptions: {
                velocityType: 'Global Wind',
                position: 'bottomleft',
                emptyString: 'No velocity data',
                angleConvention: 'bearingCW',
                displayPosition: 'bottomleft',
                displayEmptyString: 'No velocity data',
                speedUnit: 'kt',
            },
            data: [],
            minVelocity: 0,
            maxVelocity: 10,
            velocityScale: 0.005,
            colorScale: [],
        };
    }
}
export class LeafletVelocityView extends LeafletLayerView {
    create_obj() {
        const options = this.get_options();
        options.data = this.model.get('data');
        //@ts-ignore
        this.obj = L.velocityLayer(options);
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:data', () => {
            const data = this.model.get('data');
            this.obj.setData(data);
        });
        // Separate display_options from the options to perform a shallow copy.
        const key = 'display_options';
        this.listenTo(this.model, 'change:' + key, () => {
            const options = {};
            options[camel_case(key)] = { ...this.model.get(key) };
            setOptions(this.obj, options);
        });
    }
}
//# sourceMappingURL=Velocity.js.map