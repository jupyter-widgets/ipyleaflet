// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { unpack_models } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletDivOverlayModel, LeafletDivOverlayView } from './DivOverlay';
import { LeafletUILayerModel } from './Layer';
export class LeafletTooltipModel extends LeafletDivOverlayModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletTooltipView',
            _model_name: 'LeafletTooltipModel',
        };
    }
}
LeafletTooltipModel.serializers = {
    ...LeafletUILayerModel.serializers,
    child: { deserialize: unpack_models },
};
export class LeafletTooltipView extends LeafletDivOverlayView {
    create_obj() {
        this.obj = L.tooltip(this.get_options()).setLatLng(this.model.get('location'));
        this.model.on('msg:custom', this.handle_message.bind(this));
    }
    initialize(parameters) {
        super.initialize(parameters);
        this.child_promise = Promise.resolve();
    }
    leaflet_events() {
        super.leaflet_events();
    }
    model_events() {
        super.model_events();
        this.model.on('change:child', () => {
            this.set_child(this.model.get('child'));
        });
        this.model.on_some_change(['permanent', 'direction', 'max_height'], this.update, this);
    }
    force_update() {
        // This is a workaround for enforcing the options update
        if (this.map_view.obj.hasLayer(this.obj)) {
            this.map_view.obj.closeTooltip(this.obj);
            this.map_view.obj.openTooltip(this.obj);
        }
        else {
            this.map_view.obj.openTooltip(this.obj);
            this.map_view.obj.closeTooltip(this.obj);
        }
    }
}
//# sourceMappingURL=Tooltip.js.map