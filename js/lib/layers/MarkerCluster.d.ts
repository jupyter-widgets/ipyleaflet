declare const layer: any;
export declare class LeafletMarkerClusterModel extends layer.LeafletLayerModel {
    defaults(): any;
}
export declare class LeafletMarkerClusterView extends layer.LeafletLayerView {
    model_events(): void;
    remove_layer_view(child_view: any): void;
    add_layer_model(child_model: any): any;
    create_obj(): void;
}
export {};
