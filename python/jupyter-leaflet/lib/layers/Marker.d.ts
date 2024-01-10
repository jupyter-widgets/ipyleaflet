import { WidgetModel, WidgetView } from '@jupyter-widgets/base';
import { Marker } from 'leaflet';
import { LeafletIconView } from './Icon';
import { ILeafletLayerModel, LeafletUILayerModel, LeafletUILayerView } from './Layer';
interface ILeafletMarkerModel extends ILeafletLayerModel {
    _view_name: string;
    _model_name: string;
    location: number[];
    opacity: number;
    visible: boolean;
    z_index_offset: number;
    draggable: boolean;
    keyboard: boolean;
    title: string;
    alt: string;
    rise_on_hover: boolean;
    rise_offset: number;
    rotation_angle: number;
    rotation_origin: string;
    icon: WidgetModel | null;
}
export declare class LeafletMarkerModel extends LeafletUILayerModel {
    defaults(): ILeafletMarkerModel;
}
export declare class LeafletMarkerView extends LeafletUILayerView {
    obj: Marker;
    icon_promise: Promise<void>;
    icon: LeafletIconView;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletMarkerModel>): void;
    create_obj(): void;
    remove(): void;
    set_icon(value: WidgetModel): void;
    model_events(): void;
}
export {};
//# sourceMappingURL=Marker.d.ts.map