import L from '../leaflet';
import { LeafletPathModel, LeafletPathView } from './Path';
export class LeafletPolylineModel extends LeafletPathModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPolylineView',
            _model_name: 'LeafletPolylineModel',
            locations: [],
            smooth_factor: 1.0,
            no_clip: true,
        };
    }
}
export class LeafletPolylineView extends LeafletPathView {
    create_obj() {
        this.obj = L.polyline(this.model.get('locations'), this.get_options());
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:locations', () => {
            this.obj.setLatLngs(this.model.get('locations'));
            if (this.obj.transform) {
                this.obj.transform.reset();
            }
        });
        this.model.on_some_change(['scaling', 'uniform_scaling', 'rotation'], this.update_transform, this);
        this.listenTo(this.model, 'change:draggable', () => {
            if (this.obj.dragging) {
                this.obj.dragging[this.model.get('draggable') ? 'enable' : 'disable']();
            }
        });
        this.listenTo(this.model, 'change:transform', () => {
            if (this.obj.transform) {
                this.obj.transform[this.model.get('transform') ? 'enable' : 'disable']();
            }
        });
    }
    update_transform() {
        if (this.obj.transform) {
            this.obj.transform
                .setOptions({
                scaling: this.model.get('scaling'),
                uniformScaling: this.model.get('uniform_scaling'),
                rotation: this.model.get('rotation'),
            })
                .enable();
        }
    }
}
//# sourceMappingURL=Polyline.js.map