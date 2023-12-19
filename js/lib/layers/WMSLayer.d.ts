declare const tilelayer: any;
export declare class LeafletWMSLayerModel extends tilelayer.LeafletTileLayerModel {
    defaults(): any;
}
export declare class LeafletWMSLayerView extends tilelayer.LeafletTileLayerView {
    create_obj(): void;
    model_events(): void;
}
export {};
