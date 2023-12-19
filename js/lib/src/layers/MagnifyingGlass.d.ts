declare const rasterlayer: any;
declare const layer: any;
export declare class LeafletMagnifyingGlassModel extends rasterlayer.LeafletRasterLayerModel {
    defaults(): any;
}
export declare class LeafletMagnifyingGlassView extends layer.LeafletLayerView {
    remove_layer_view(child_view: any): void;
    add_layer_model(child_model: any): any;
    create_obj(): any;
    model_events(): void;
}
export {};
