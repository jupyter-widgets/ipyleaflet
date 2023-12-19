declare const control: any;
export declare class LeafletLayersControlModel extends control.LeafletControlModel {
    defaults(): any;
}
export declare class LeafletLayersControlView extends control.LeafletControlView {
    /**
     * Core leaflet layers control maintains its own list of layers internally
     * causing issues when the layers of the underlying map changes
     * exogeneously, for example from a model change.
     *
     * For this reason, upon change of the underlying list of layers, we
     * destroy the layers control object and create a new one.
     */
    initialize(parameters: any): void;
    toggle_obj(): void;
    model_events(): void;
    create_obj(): Promise<void>;
}
export {};
