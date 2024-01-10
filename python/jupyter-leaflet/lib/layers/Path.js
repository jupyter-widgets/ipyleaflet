// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { LeafletVectorLayerModel, LeafletVectorLayerView } from './VectorLayer';
export class LeafletPathModel extends LeafletVectorLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPathView',
            _model_name: 'LeafletPathModel',
            stroke: true,
            color: '#0033FF',
            weight: 5,
            fill: true,
            fill_color: null,
            fill_opacity: 0.2,
            dash_array: null,
            line_cap: 'round',
            line_join: 'round',
            pointer_events: '',
        };
    }
}
export class LeafletPathView extends LeafletVectorLayerView {
    model_events() {
        super.model_events();
        let key;
        const o = this.model.get('options');
        for (let i = 0; i < o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, () => {
                this.obj.setStyle(this.get_options());
            });
        }
    }
}
//# sourceMappingURL=Path.js.map