import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletSearchControlModel extends LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        url: null;
        jsonp_param: string;
        property_name: string;
        property_loc: string[];
        auto_type: boolean;
        auto_collapse: boolean;
        zoom: null;
        animate_location: boolean;
        found_style: {
            fillColor: string;
            color: string;
        };
        marker: null;
        layer: null;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletSearchControlView extends LeafletControlView {
    obj: any;
    create_obj(): Promise<void>;
    leaflet_events(): void;
}
//# sourceMappingURL=SearchControl.d.ts.map