declare const control: any;
export declare class LeafletSearchControlModel extends control.LeafletControlModel {
    defaults(): any;
}
export declare class LeafletSearchControlView extends control.LeafletControlView {
    create_obj(): Promise<void>;
    leaflet_events(): void;
}
export {};
