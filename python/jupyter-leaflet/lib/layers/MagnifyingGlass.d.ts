import { ViewList, WidgetModel } from '@jupyter-widgets/base';
import { Layer } from 'leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
import { LeafletRasterLayerModel } from './RasterLayer';
export declare class LeafletMagnifyingGlassModel extends LeafletRasterLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        radius: number;
        zoomOffset: number;
        fixedZoom: number;
        fixedPosition: boolean;
        latLng: never[];
        layers: never[];
        visible: boolean;
        _view_module: string;
        _model_module: string;
        opacity: number;
        bottom: boolean;
        options: string[];
        name: string;
        base: boolean;
        popup: WidgetModel | null;
        popup_min_width: number;
        popup_max_width: number;
        popup_max_height: number | null;
        pane: string;
        subitems: Layer[];
    };
}
export declare class LeafletMagnifyingGlassView extends LeafletLayerView {
    layer_views: ViewList<Layer>;
    remove_layer_view(child_view: Layer): void;
    add_layer_model(child_model: LeafletLayerModel): Promise<Layer>;
    create_obj(): Promise<void>;
    model_events(): void;
}
//# sourceMappingURL=MagnifyingGlass.d.ts.map