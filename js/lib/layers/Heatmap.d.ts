declare const rasterlayer: any;
declare const layer: any;
export declare class LeafletHeatmapModel extends rasterlayer.LeafletRasterLayerModel {
    defaults(): any;
}
export declare class LeafletHeatmapView extends layer.LeafletLayerView {
    create_obj(): void;
    model_events(): void;
}
export {};
