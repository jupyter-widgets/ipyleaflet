import L from '../leaflet';
import { LeafletRasterLayerModel, LeafletRasterLayerView } from './RasterLayer';
const DEFAULT_LOCATION = [0.0, 0.0];
export class LeafletVideoOverlayModel extends LeafletRasterLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletVideoOverlayView',
            _model_name: 'LeafletVideoOverlayModel',
            url: '',
            bounds: [DEFAULT_LOCATION, DEFAULT_LOCATION],
            attribution: '',
        };
    }
}
export class LeafletVideoOverlayView extends LeafletRasterLayerView {
    create_obj() {
        this.obj = L.videoOverlay(this.model.get('url'), this.model.get('bounds'), this.get_options());
        this.obj.on('load', () => {
            const MyPauseControl = L.Control.extend({
                onAdd: () => {
                    const button = L.DomUtil.create('button');
                    button.innerHTML = '&#10074&#10074';
                    L.DomEvent.on(button, 'click', () => {
                        this.obj.getElement()?.pause();
                    });
                    return button;
                },
            });
            const MyPlayControl = L.Control.extend({
                onAdd: () => {
                    const button = L.DomUtil.create('button');
                    button.innerHTML = '&#9658';
                    L.DomEvent.on(button, 'click', () => {
                        this.obj.getElement()?.play();
                    });
                    return button;
                },
            });
            new MyPauseControl().addTo(this.map_view.obj);
            new MyPlayControl().addTo(this.map_view.obj);
        });
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:url', () => {
            const url = this.model.get('url');
            const bounds = this.model.get('bounds');
            const options = this.get_options();
            this.map_view.obj.removeLayer(this.obj);
            this.obj = L.videoOverlay(url, bounds, options);
            this.map_view.obj.addLayer(this.obj);
        });
        this.listenTo(this.model, 'change:bounds', () => {
            const url = this.model.get('url');
            const bounds = this.model.get('bounds');
            const options = this.get_options();
            this.map_view.obj.removeLayer(this.obj);
            this.obj = L.videoOverlay(url, bounds, options);
            this.map_view.obj.addLayer(this.obj);
        });
    }
}
//# sourceMappingURL=VideoOverlay.js.map