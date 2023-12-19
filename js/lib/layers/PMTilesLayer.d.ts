declare const layer: any;
export declare class LeafletPMTilesLayerModel extends layer.LeafletLayerModel {
    defaults(): any;
}
export declare class LeafletPMTilesLayerView extends layer.LeafletLayerView {
    create_obj(): void;
    model_events(): void;
    handle_message(content: any): void;
}
export {};
