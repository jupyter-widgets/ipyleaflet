// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export class LeafletVectorLayerModel extends LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletVectorLayerView',
            _model_name: 'LeafletVectorLayerModel',
        };
    }
}
export class LeafletVectorLayerView extends LeafletLayerView {
}
//# sourceMappingURL=VectorLayer.js.map