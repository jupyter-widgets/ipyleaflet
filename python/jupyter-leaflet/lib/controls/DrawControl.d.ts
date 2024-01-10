import { WidgetView } from '@jupyter-widgets/base';
import { GeoJSON } from 'leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletDrawControlModel extends LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        polyline: {
            shapeOptions: {};
        };
        polygon: {
            shapeOptions: {};
        };
        circle: {};
        circlemarker: {};
        rectangle: {};
        marker: {};
        data: never[];
        edit: boolean;
        remove: boolean;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletDrawControlView extends LeafletControlView {
    feature_group: GeoJSON;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletControlModel>): void;
    create_obj(): void;
    remove(): void;
    data_to_layers(): void;
    layers_to_data(): void;
    handle_message(content: {
        msg: string;
    }): void;
}
//# sourceMappingURL=DrawControl.d.ts.map