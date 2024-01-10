// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export class LeafletRasterLayerModel extends LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletRasterLayerView',
            _model_name: 'LeafletRasterLayerModel',
            visible: true,
        };
    }
}
export class LeafletRasterLayerView extends LeafletLayerView {
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:opacity', () => {
            if (this.model.get('visible')) {
                this.obj.setOpacity(this.model.get('opacity'));
            }
        });
        this.listenTo(this.model, 'change:visible', () => {
            if (this.model.get('visible')) {
                this.obj.setOpacity(this.model.get('opacity'));
            }
            else {
                this.obj.setOpacity(0);
            }
        });
        if (this.model.get('visible')) {
            this.obj.setOpacity(this.model.get('opacity'));
        }
        else {
            this.obj.setOpacity(0);
        }
    }
}
//# sourceMappingURL=RasterLayer.js.map