declare const layer: any;
export declare class LeafletPopupModel extends layer.LeafletUILayerModel {
    defaults(): any;
}
export declare class LeafletPopupView extends layer.LeafletUILayerView {
    create_obj(): void;
    initialize(parameters: any): void;
    render(): any;
    remove(): void;
    set_child(value: any): any;
    leaflet_events(): void;
    model_events(): void;
    update_popup(): void;
    force_update(): void;
    handle_message(content: any): void;
}
export {};
