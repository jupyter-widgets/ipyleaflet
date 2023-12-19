declare const layer: any;
export declare class LeafletMarkerModel extends layer.LeafletUILayerModel {
    defaults(): any;
}
export declare class LeafletMarkerView extends layer.LeafletUILayerView {
    initialize(parameters: any): void;
    create_obj(): void;
    remove(): void;
    set_icon(value: any): void;
    model_events(): void;
}
export {};
