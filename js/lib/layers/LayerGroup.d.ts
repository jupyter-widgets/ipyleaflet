declare const layer: any;
export declare class LeafletLayerGroupModel extends layer.LeafletLayerModel {
    defaults(): any;
}
export declare class LeafletLayerGroupView extends layer.LeafletLayerView {
    create_obj(): void;
    remove_layer_view(child_view: any): void;
    add_layer_model(child_model: any): any;
    model_events(): void;
}
export {};
