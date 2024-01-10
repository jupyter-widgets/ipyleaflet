// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { unpack_models } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView, } from './Layer';
const DEFAULT_LOCATION = [0.0, 0.0];
export class LeafletMarkerModel extends LeafletUILayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletMarkerView',
            _model_name: 'LeafletMarkerModel',
            location: DEFAULT_LOCATION,
            opacity: 1.0,
            visible: true,
            z_index_offset: 0,
            draggable: true,
            keyboard: true,
            title: '',
            alt: '',
            rise_on_hover: false,
            rise_offset: 250,
            rotation_angle: 0,
            rotation_origin: '',
            icon: null,
        };
    }
}
LeafletMarkerModel.serializers = {
    ...LeafletUILayerModel.serializers,
    icon: { deserialize: unpack_models },
};
export class LeafletMarkerView extends LeafletUILayerView {
    initialize(parameters) {
        super.initialize(parameters);
        this.icon_promise = Promise.resolve();
    }
    create_obj() {
        this.obj = L.marker(this.model.get('location'), this.get_options());
        this.obj.on('dragend', (event) => {
            const marker = event.target;
            const position = marker.getLatLng();
            this.model.set('location', [position.lat, position.lng]);
            this.touch();
        });
    }
    remove() {
        super.remove();
        this.icon_promise.then(() => {
            if (this.icon) {
                this.icon.remove();
            }
        });
    }
    set_icon(value) {
        if (this.icon) {
            this.icon.remove();
        }
        if (value) {
            this.icon_promise = this.icon_promise.then(async () => {
                const view = await this.create_child_view(value);
                this.obj.setIcon(view.obj);
                this.icon = view;
            });
        }
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:location', () => {
            this.obj.setLatLng(this.model.get('location'));
            this.send({
                event: 'move',
                location: this.model.get('location'),
            });
        });
        this.listenTo(this.model, 'change:z_index_offset', () => {
            this.obj.setZIndexOffset(this.model.get('z_index_offset'));
        });
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
        this.listenTo(this.model, 'change:rotation_angle', () => {
            this.obj.setRotationAngle(this.model.get('rotation_angle'));
        });
        this.listenTo(this.model, 'change:rotation_origin', () => {
            this.obj.setRotationOrigin(this.model.get('rotation_origin'));
        });
        this.obj.setLatLng(this.model.get('location'));
        this.obj.setZIndexOffset(this.model.get('z_index_offset'));
        if (this.model.get('visible')) {
            this.obj.setOpacity(this.model.get('opacity'));
        }
        else {
            this.obj.setOpacity(0);
        }
        this.obj.setRotationAngle(this.model.get('rotation_angle'));
        this.obj.setRotationOrigin(this.model.get('rotation_origin'));
        this.listenTo(this.model, 'change:icon', () => {
            this.set_icon(this.model.get('icon'));
        });
        this.set_icon(this.model.get('icon'));
    }
}
//# sourceMappingURL=Marker.js.map