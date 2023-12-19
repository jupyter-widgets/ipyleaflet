declare const rasterlayer: any;
export declare class LeafletTileLayerModel extends rasterlayer.LeafletRasterLayerModel {
    defaults(): any;
}
export declare class LeafletTileLayerView extends rasterlayer.LeafletRasterLayerView {
    create_obj(): void;
    leaflet_events(): void;
    model_events(): void;
    handle_message(content: any): void;
}
export {};
