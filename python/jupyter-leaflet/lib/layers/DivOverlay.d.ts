import { DOMWidgetView, WidgetView } from '@jupyter-widgets/base';
import { DivOverlay, DivOverlayOptions } from 'leaflet';
import L from '../leaflet';
import { ILeafletLayerModel, LeafletUILayerModel, LeafletUILayerView } from './Layer';
type DivOverlayDefaultsI = {
    child: any;
    location: number[];
} & ILeafletLayerModel;
export type DivOverlayDefaults = DivOverlayDefaultsI & DivOverlayOptions;
export declare class LeafletDivOverlayModel extends LeafletUILayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        location: number[];
        child: null;
        offset: number[];
        _view_module: string;
        _model_module: string;
        opacity: number;
        bottom: boolean;
        options: string[];
        name: string;
        base: boolean;
        popup: import("@jupyter-widgets/base").WidgetModel | null;
        popup_min_width: number;
        popup_max_width: number;
        popup_max_height: number | null;
        pane: string;
        subitems: L.Layer[];
    };
}
export declare abstract class LeafletDivOverlayView extends LeafletUILayerView {
    obj: DivOverlay;
    child: DOMWidgetView;
    child_promise: Promise<void>;
    abstract create_obj(): void;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletDivOverlayModel>): void;
    render(): Promise<void>;
    remove(): void;
    set_child(value: LeafletDivOverlayModel): Promise<void>;
    leaflet_events(): void;
    model_events(): void;
    update(): void;
    abstract force_update(): void;
}
export {};
//# sourceMappingURL=DivOverlay.d.ts.map