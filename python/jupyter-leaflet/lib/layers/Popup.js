// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { unpack_models } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletDivOverlayModel, LeafletDivOverlayView } from './DivOverlay';
import { LeafletUILayerModel } from './Layer';
export class LeafletPopupModel extends LeafletDivOverlayModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPopupView',
            _model_name: 'LeafletPopupModel',
            minWidth: 50,
            maxWidth: 300,
            maxHeight: undefined,
            offset: [0, 7],
            permanent: false,
            direction: 'auto',
        };
    }
}
LeafletPopupModel.serializers = {
    ...LeafletUILayerModel.serializers,
    child: { deserialize: unpack_models },
};
export class LeafletPopupView extends LeafletDivOverlayView {
    create_obj() {
        this.obj = L.popup(this.get_options()).setLatLng(this.model.get('location'));
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
        this.model.on_some_change(['min_width', 'max_width', 'max_height'], this.update, this);
    }
    force_update() {
        // This is a workaround for enforcing the options update
        if (this.map_view.obj.hasLayer(this.obj)) {
            this.map_view.obj.closePopup(this.obj);
            this.map_view.obj.openPopup(this.obj);
        }
        else {
            this.map_view.obj.openPopup(this.obj);
            this.map_view.obj.closePopup(this.obj);
        }
    }
    handle_message(content) {
        //const objContent = this.obj.getContent();
        // Check that object has actual Content
        if (content.msg == 'open'
        //&& objContent && !(objContent instanceof Function)
        ) {
            // TODO: Using Content object here introduces a bug
            //@ts-ignore
            this.map_view.obj.openPopup(this.obj, content.location);
        }
        else if (content.msg == 'close') {
            this.map_view.obj.closePopup(this.obj);
        }
    }
}
//# sourceMappingURL=Popup.js.map