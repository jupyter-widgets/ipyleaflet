// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { unpack_models, } from '@jupyter-widgets/base';
import { MessageLoop } from '@lumino/messaging';
import { Widget } from '@lumino/widgets';
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView, } from './Layer';
const DEFAULT_LOCATION = [0.0, 0.0];
export class LeafletDivOverlayModel extends LeafletUILayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletDivOverlayView',
            _model_name: 'LeafletDivOverlayModel',
            location: DEFAULT_LOCATION,
            child: null,
            offset: [0, 0],
        };
    }
}
LeafletDivOverlayModel.serializers = {
    ...LeafletUILayerModel.serializers,
    child: { deserialize: unpack_models },
};
export class LeafletDivOverlayView extends LeafletUILayerView {
    initialize(parameters) {
        super.initialize(parameters);
        this.child_promise = Promise.resolve();
    }
    render() {
        super.render();
        return this.set_child(this.model.get('child'));
    }
    remove() {
        super.remove();
        this.child_promise.then(() => {
            if (this.child) {
                this.child.remove();
            }
        });
    }
    set_child(value) {
        if (this.child) {
            this.child.remove();
        }
        if (value) {
            this.child_promise = this.child_promise.then(async () => {
                const view = await this.create_child_view(value);
                MessageLoop.sendMessage(view.pWidget, Widget.Msg.BeforeAttach);
                this.obj.setContent(view.el);
                MessageLoop.sendMessage(view.pWidget, Widget.Msg.AfterAttach);
                this.force_update();
                this.child = view;
                this.trigger('child:created');
            });
        }
        return this.child_promise;
    }
    leaflet_events() {
        super.leaflet_events();
        this.obj.on('add', () => {
            // This is a workaround for making maps rendered correctly in DivOverlays
            window.dispatchEvent(new Event('resize'));
        });
    }
    model_events() {
        super.model_events();
        this.model.on('change:child', () => {
            this.set_child(this.model.get('child'));
        });
    }
    update() {
        L.setOptions(this.obj, this.get_options());
        this.force_update();
    }
}
//# sourceMappingURL=DivOverlay.js.map