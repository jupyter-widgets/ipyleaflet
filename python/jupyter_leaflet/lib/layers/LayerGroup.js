// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { unpack_models, ViewList } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export class LeafletLayerGroupModel extends LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletLayerGroupView',
            _model_name: 'LeafletLayerGroupModel',
            layers: [],
        };
    }
}
LeafletLayerGroupModel.serializers = {
    ...LeafletLayerModel.serializers,
    layers: { deserialize: unpack_models },
};
export class LeafletLayerGroupView extends LeafletLayerView {
    create_obj() {
        this.obj = L.layerGroup();
        this.layer_views = new ViewList(this.add_layer_model, this.remove_layer_view, this);
        this.layer_views.update(this.model.get('layers'));
    }
    remove_layer_view(child_view) {
        this.obj.removeLayer(child_view.obj);
        child_view.remove();
    }
    async add_layer_model(child_model) {
        const child_view = await this.create_child_view(child_model);
        this.obj.addLayer(child_view.obj);
        return child_view;
    }
    model_events() {
        this.listenTo(this.model, 'change:layers', () => {
            this.layer_views.update(this.model.get('layers'));
        });
    }
}
//# sourceMappingURL=LayerGroup.js.map