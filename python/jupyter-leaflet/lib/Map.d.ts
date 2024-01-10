import { DOMWidgetModel, Dict, IBackboneModelOptions, StyleModel, ViewList, WidgetView } from '@jupyter-widgets/base';
import { Message } from '@lumino/messaging';
import { ObjectHash } from 'backbone';
import { Map } from 'leaflet';
import { LeafletControlModel, LeafletControlView, LeafletLayerModel, LeafletLayerView } from './jupyter-leaflet';
import { LeafletDOMWidgetView } from './utils';
export declare class LeafletMapStyleModel extends StyleModel {
    defaults(): {
        _model_name: string;
        _model_module: string;
    };
}
export declare class LeafletMapModel extends DOMWidgetModel {
    _dragging: boolean;
    views: Dict<Promise<LeafletMapView>>;
    defaults(): {
        _view_name: string;
        _model_name: string;
        _model_module: string;
        _view_module: string;
        center: number[];
        zoom: number;
        max_zoom: null;
        min_zoom: null;
        dragging: boolean;
        touch_zoom: boolean;
        zoom_delta: number;
        zoom_snap: number;
        scroll_wheel_zoom: boolean;
        double_click_zoom: boolean;
        box_zoom: boolean;
        tap: boolean;
        tap_tolerance: number;
        world_copy_jump: boolean;
        close_popup_on_click: boolean;
        bounce_at_zoom_limits: boolean;
        keyboard: boolean;
        keyboard_pan_offset: number;
        keyboard_zoom_offset: number;
        inertia: boolean;
        inertia_deceleration: number;
        inertia_max_speed: number;
        zoom_animation_threshold: number;
        south: number | undefined;
        north: number | undefined;
        east: number | undefined;
        west: number | undefined;
        bottom: number;
        top: number;
        right: number;
        left: number;
        options: never[];
        panes: {};
        layers: never[];
        controls: never[];
        crs: {
            name: string;
            custom: boolean;
        };
        style: null;
        default_style: null;
        dragging_style: null;
    };
    initialize(attributes: ObjectHash, options: IBackboneModelOptions): void;
    update_style(): void;
    update_bounds(): Promise<void>;
}
export declare class LeafletMapView extends LeafletDOMWidgetView {
    obj: Map;
    dirty: boolean;
    map_container: HTMLDivElement;
    map_child: HTMLDivElement;
    layer_views: ViewList<LeafletLayerView>;
    control_views: ViewList<LeafletControlView>;
    model: LeafletMapModel;
    initialize(options: WidgetView.IInitializeParameters<LeafletMapModel>): void;
    create_panes(): void;
    remove_layer_view(child_view: LeafletLayerView): void;
    add_layer_model(child_model: LeafletLayerModel): Promise<LeafletLayerView>;
    remove_control_view(child_view: LeafletControlView): void;
    add_control_model(child_model: LeafletControlModel): Promise<LeafletControlView>;
    render(): void;
    render_leaflet(): void;
    create_obj(): Promise<void>;
    rerender(): void;
    leaflet_events(): void;
    model_events(): void;
    processPhosphorMessage(msg: Message): void;
    processLuminoMessage(msg: Message): void;
    _processLuminoMessage(msg: Message, _super: Function): void;
}
//# sourceMappingURL=Map.d.ts.map