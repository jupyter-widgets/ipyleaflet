declare const widgets: any;
declare const utils: any;
export declare class LeafletMapStyleModel extends widgets.StyleModel {
    defaults(): any;
}
export declare class LeafletMapModel extends widgets.DOMWidgetModel {
    defaults(): any;
    initialize(attributes: any, options: any): void;
    update_style(): void;
    update_bounds(): any;
}
export declare class LeafletMapView extends utils.LeafletDOMWidgetView {
    initialize(options: any): void;
    create_panes(): void;
    remove_layer_view(child_view: any): void;
    add_layer_model(child_model: any): any;
    remove_control_view(child_view: any): void;
    add_control_model(child_model: any): any;
    render(): void;
    render_leaflet(): void;
    create_obj(): any;
    rerender(): void;
    leaflet_events(): void;
    model_events(): void;
    handle_msg(content: any): void;
    processPhosphorMessage(msg: any): void;
    processLuminoMessage(msg: any): void;
    _processLuminoMessage(msg: any, _super: any): void;
}
export {};
